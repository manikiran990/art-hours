// ============================================================
//  ART HOURS — config.js
//  Everything you might want to change lives here.
//  index.html reads from this file — do not rename it.
// ============================================================


// ── APP ──────────────────────────────────────────────────────
const CFG_APP_NAME    = 'Art Hours';
const CFG_APP_TAGLINE = 'Daily Practice Logger';


// ── GOOGLE SHEETS SYNC URL ───────────────────────────────────
// Paste your Apps Script Web App URL here.
// Leave as empty string '' to disable auto-sync on fresh install.
// (Safe to hardcode if your repo is private)
const CFG_SHEET_URL = ''; // Paste your URL in Settings — it saves automatically


// ── THEME COLOURS ────────────────────────────────────────────
// These map to CSS variables in index.html.
// Change here and the whole app updates.
const CFG_THEME = {
  bg:       '#0e0e0f',   // page background
  surface:  '#17181a',   // card background
  surface2: '#1e1f22',   // input background
  border:   '#2a2b2e',   // borders
  green:    '#4ade80',   // met / success
  red:      '#f87171',   // missed / danger
  accent:   '#f5c842',   // gold — brand colour
  text:     '#e8e6e0',   // primary text
  muted:    '#6b6a65',   // secondary text
};


// ── COLOUR PALETTE FOR CATEGORIES ────────────────────────────
// Shown as swatches in the category editor.
// Add or remove colours freely.
const CFG_CAT_COLORS = [
  '#4ade80', // green
  '#f87171', // red
  '#60a5fa', // blue
  '#f5c842', // gold
  '#c084fc', // purple
  '#fb923c', // orange
  '#34d399', // teal
  '#f472b6', // pink
  '#94a3b8', // slate
  '#facc15', // yellow
];


// ── DEFAULT CATEGORIES ───────────────────────────────────────
// Shown on first install (before user customises).
// isDefault: true  →  pre-selected in the log form.
const CFG_DEFAULT_CATS = [
  {
    id:            'general',
    name:          'General',
    color:         '#f5c842',
    subcategories: [],
    isDefault:     true,
  },
  {
    id:            'figure',
    name:          'Figure Drawing',
    color:         '#4ade80',
    subcategories: ['Portraits', 'Gestures', 'Anatomy'],
    isDefault:     false,
  },
  {
    id:            'painting',
    name:          'Painting',
    color:         '#60a5fa',
    subcategories: ['Oils', 'Watercolour', 'Digital'],
    isDefault:     false,
  },
  {
    id:            'theory',
    name:          'Color Theory',
    color:         '#c084fc',
    subcategories: [],
    isDefault:     false,
  },
];


// ── DEFAULT TARGETS (hours per day) ──────────────────────────
// Used on first install and for the "auto-fill target" in the log form.
// User can override per day in Settings.
const CFG_DEFAULT_TARGETS = {
  Mon: 5,
  Tue: 5,
  Wed: 5,
  Thu: 5,
  Fri: 5,
  Sat: 12,
  Sun: 12,
};


// ── LEVELS ───────────────────────────────────────────────────
// min / max = cumulative hours thresholds.
// Rename levels or adjust thresholds freely.
// Last level should have max: Infinity.
const CFG_LEVELS = [
  { level: 1, name: 'Beginner',     min: 0,    max: 50   },
  { level: 2, name: 'Apprentice',   min: 50,   max: 150  },
  { level: 3, name: 'Practitioner', min: 150,  max: 300  },
  { level: 4, name: 'Journeyman',   min: 300,  max: 500  },
  { level: 5, name: 'Skilled',      min: 500,  max: 750  },
  { level: 6, name: 'Expert',       min: 750,  max: 1000 },
  { level: 7, name: 'Master',       min: 1000, max: 1500 },
  { level: 8, name: 'Grand Master', min: 1500, max: Infinity },
];


// ── BADGES ───────────────────────────────────────────────────
// icon  — any emoji
// name  — short display name
// desc  — shown in the badge detail sheet
// check — function(stats) => boolean
//   stats has: current, best, total, debt, hasDoubled, hasComeback
// Streak badges use current streak (lose streak → badge goes dark).
const CFG_BADGES = [
  {
    id:    'streak3',
    icon:  '🔥',
    name:  'First Spark',
    desc:  'Maintain a 3 day streak',
    check: s => s.current >= 3,
  },
  {
    id:    'streak7',
    icon:  '⚡',
    name:  'Week Warrior',
    desc:  'Maintain a 7 day streak',
    check: s => s.current >= 7,
  },
  {
    id:    'streak14',
    icon:  '💪',
    name:  'Fortnight',
    desc:  'Maintain a 14 day streak',
    check: s => s.current >= 14,
  },
  {
    id:    'streak30',
    icon:  '🏆',
    name:  'Month Master',
    desc:  'Maintain a 30 day streak',
    check: s => s.current >= 30,
  },
  {
    id:    'hours10',
    icon:  '🌱',
    name:  'First 10h',
    desc:  'Log 10 total hours',
    check: s => s.total >= 10,
  },
  {
    id:    'hours100',
    icon:  '⭐',
    name:  'Century',
    desc:  '100 total hours',
    check: s => s.total >= 100,
  },
  {
    id:    'hours500',
    icon:  '💫',
    name:  '500 Hours',
    desc:  '500 total hours',
    check: s => s.total >= 500,
  },
  {
    id:    'hours1000',
    icon:  '👑',
    name:  '1000 Hours',
    desc:  '1000 total hours',
    check: s => s.total >= 1000,
  },
  {
    id:    'perfectwk',
    icon:  '🎯',
    name:  'Perfect Week',
    desc:  'Hit target 7 days in a row — active streak',
    check: s => s.current >= 7,
  },
  {
    id:    'overachiever',
    icon:  '🚀',
    name:  'Overachiever',
    desc:  'Do 2× your target in a day',
    check: s => s.hasDoubled,
  },
  {
    id:    'debtfree',
    icon:  '💰',
    name:  'Debt Free',
    desc:  'Art debt reaches zero',
    check: s => s.debt <= 0 && s.total > 0,
  },
  {
    id:    'comeback',
    icon:  '🔄',
    name:  'Comeback',
    desc:  'Log after a 7+ day gap',
    check: s => s.hasComeback,
  },
];


// ── SEED DATA ────────────────────────────────────────────────
// Shown on first install before any real data is logged.
// Replace with your own entries or set to [] for a clean start.
const CFG_SEED = [
  {date:'2025-12-15',hours:1.17,target:5},{date:'2025-12-16',hours:5,target:5},
  {date:'2025-12-17',hours:5,target:5},{date:'2025-12-18',hours:5.5,target:5},
  {date:'2025-12-19',hours:5.5,target:5},{date:'2025-12-20',hours:12,target:12},
  {date:'2025-12-21',hours:12,target:12},{date:'2025-12-22',hours:2.5,target:5},
  {date:'2025-12-23',hours:6,target:5},{date:'2025-12-24',hours:6,target:5},
  {date:'2025-12-25',hours:12,target:12},{date:'2025-12-26',hours:7.17,target:5},
  {date:'2025-12-27',hours:12,target:12},{date:'2025-12-28',hours:1,target:12},
  {date:'2025-12-29',hours:5,target:5},{date:'2025-12-30',hours:5,target:5},
  {date:'2025-12-31',hours:5.6,target:5},{date:'2026-01-01',hours:5.25,target:5},
  {date:'2026-01-02',hours:6,target:5},{date:'2026-01-03',hours:12,target:12},
  {date:'2026-01-04',hours:12,target:12},{date:'2026-01-05',hours:5,target:5},
  {date:'2026-01-06',hours:5,target:5},{date:'2026-01-07',hours:5,target:5},
  {date:'2026-01-08',hours:5,target:5},{date:'2026-01-09',hours:1.5,target:1},
  {date:'2026-01-10',hours:1.5,target:1},{date:'2026-01-11',hours:1,target:1},
  {date:'2026-01-12',hours:1.2,target:1},{date:'2026-01-13',hours:1,target:1},
  {date:'2026-01-14',hours:1.33,target:1},{date:'2026-01-15',hours:1.1,target:1},
  {date:'2026-01-16',hours:1.2,target:1},{date:'2026-01-17',hours:1,target:1},
  {date:'2026-01-18',hours:1,target:1},{date:'2026-01-19',hours:1,target:1},
  {date:'2026-01-20',hours:1,target:1},{date:'2026-01-21',hours:1,target:1},
  {date:'2026-01-22',hours:1,target:1},{date:'2026-01-23',hours:1,target:1},
  {date:'2026-01-24',hours:1,target:1},{date:'2026-01-25',hours:1,target:1},
  {date:'2026-01-26',hours:1,target:1},{date:'2026-01-27',hours:1,target:5},
  {date:'2026-01-28',hours:4,target:5},{date:'2026-01-29',hours:1,target:5},
  {date:'2026-01-30',hours:1,target:5},{date:'2026-01-31',hours:2.75,target:12},
  {date:'2026-02-01',hours:12,target:12},{date:'2026-02-02',hours:1,target:5},
  {date:'2026-02-03',hours:5,target:5},{date:'2026-02-04',hours:5,target:5},
  {date:'2026-02-05',hours:5,target:5},{date:'2026-02-06',hours:2.5,target:5},
  {date:'2026-02-07',hours:8,target:12},{date:'2026-02-08',hours:12,target:12},
  {date:'2026-02-09',hours:5,target:5},{date:'2026-02-24',hours:5,target:5},
];


// ── STORAGE KEYS ─────────────────────────────────────────────
// Change these if you ever need to reset all user data globally
// (e.g. after a breaking data structure change).
const CFG_KEYS = {
  data:      'art_hours_v2',
  sheetUrl:  'art_hours_sheet_url',
  cats:      'art_hours_categories',
  targets:   'art_hours_targets',
  migrated:  'art_hours_v2_migrated',
  lastSync:  'art_hours_last_synced',
};


// ── CALENDAR HELPERS (not really config but used everywhere) ──
const CFG_DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const CFG_MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];


// ── POMODORO DEFAULTS ─────────────────────────────────────────
// These pre-fill the Pomodoro settings in the Timer tab.
// User can change them in the UI — these are just the starting values.
const CFG_POMODORO_WORK   = 25;  // minutes per focus session
const CFG_POMODORO_BREAK  = 5;   // minutes per short break
const CFG_POMODORO_LONG   = 15;  // minutes per long break
const CFG_POMODORO_CYCLES = 4;   // focus sessions before a long break
