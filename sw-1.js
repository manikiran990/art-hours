// Art Hours — Service Worker
// Handles offline caching and background sync

const CACHE_NAME = 'art-hours-v2';
const ASSETS = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Playfair+Display:wght@700;900&display=swap'
];

// ── INSTALL: cache core assets ────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets; ignore font failures (network-only)
      return cache.addAll(['./index.html', './config.js', './manifest.json']).catch(() => {});
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: clean up old caches ────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── FETCH: serve from cache, fall back to network ─────────
self.addEventListener('fetch', event => {
  // Don't intercept Google Sheets API calls — always network
  if (event.request.url.includes('script.google.com') ||
      event.request.url.includes('googleapis.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cache successful GET responses for local files
        if (response.ok && event.request.method === 'GET' &&
            event.request.url.startsWith(self.location.origin)) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback — return cached index.html for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── BACKGROUND SYNC ───────────────────────────────────────
// Fired when connectivity is restored after a failed sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-sheets') {
    event.waitUntil(syncToSheets());
  }
});

async function syncToSheets() {
  // Read pending sync data from IndexedDB
  const db = await openDB();
  const tx = db.transaction('pending', 'readonly');
  const store = tx.objectStore('pending');
  const pending = await getAllRecords(store);

  if (!pending || !pending.length) return;

  const { url, data } = pending[pending.length - 1]; // latest snapshot
  if (!url) return;

  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ action: 'sync', data }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Clear pending on success
    const tx2 = db.transaction('pending', 'readwrite');
    tx2.objectStore('pending').clear();
    await tx2.complete;

    // Notify open clients
    const clients = await self.clients.matchAll();
    clients.forEach(c => c.postMessage({ type: 'SYNC_SUCCESS' }));
  } catch (e) {
    // Will retry on next sync opportunity
    throw e;
  }
}

// ── SIMPLE IndexedDB HELPERS ──────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('art-hours-sw', 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore('pending', { autoIncrement: true });
    };
    req.onsuccess  = e => resolve(e.target.result);
    req.onerror    = e => reject(e.target.error);
  });
}

function getAllRecords(store) {
  return new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

// ── PUSH NOTIFICATIONS (optional) ────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'Art Hours', {
      body: data.body || 'Time to log your art hours!',
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'art-hours-reminder',
      renotify: true
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      if (clients.length) { clients[0].focus(); return; }
      self.clients.openWindow('./index.html');
    })
  );
});
