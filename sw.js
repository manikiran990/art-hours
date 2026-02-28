// Art Hours — Service Worker v3
// Network-first for app files so updates always land immediately

const CACHE_NAME = 'art-hours-v3';
const STATIC = ['./index.html', './config.js', './manifest.json'];

// ── INSTALL ───────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC).catch(() => {}))
  );
  // Take over immediately — don't wait for old SW to die
  self.skipWaiting();
});

// ── ACTIVATE: nuke every old cache ───────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Deleting old cache:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: network-first for app files ───────────────────
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Always go straight to network for Sheets API
  if (url.includes('script.google.com') || url.includes('googleapis.com')) {
    return;
  }

  // Network-first for our own HTML/JS/JSON — fall back to cache offline
  if (event.request.method === 'GET' && url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            // Update cache with fresh copy
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline: serve from cache
          return caches.match(event.request)
            .then(cached => cached || (
              event.request.mode === 'navigate'
                ? caches.match('./index.html')
                : null
            ));
        })
    );
    return;
  }

  // Everything else: cache-first
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

// ── BACKGROUND SYNC ───────────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-sheets') {
    event.waitUntil(syncToSheets());
  }
});

async function syncToSheets() {
  const db = await openDB();
  const tx = db.transaction('pending', 'readonly');
  const pending = await getAllRecords(tx.objectStore('pending'));
  if (!pending || !pending.length) return;
  const { url, data } = pending[pending.length - 1];
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ action: 'sync', data }),
      headers: { 'Content-Type': 'application/json' }
    });
    const tx2 = db.transaction('pending', 'readwrite');
    tx2.objectStore('pending').clear();
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type: 'SYNC_SUCCESS' }));
  } catch (e) { throw e; }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('art-hours-sw', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('pending', { autoIncrement: true });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

function getAllRecords(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}
