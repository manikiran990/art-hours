// ============================================================
//  ART HOURS — config.js
//  Everything you might want to change lives here.
//  index.html reads from this file — do not rename it.
// ============================================================


// ── APP ──────────────────────────────────────────────────────
const CFG_APP_NAME    = 'Art Hours';
const CFG_APP_TAGLINE = 'Daily Practice Logger';


// ── GOOGLE SHEETS SYNC URL & ENCRYPTION ─────────────────────
// Run encrypt-tool.html locally to generate CFG_ENCRYPTED_URL.
// Set CFG_USE_ENCRYPTION = true once you have the encrypted string.
// Leave CFG_SHEET_URL empty — it is now handled via encryption.
const CFG_SHEET_URL      = '';    // leave empty
const CFG_USE_ENCRYPTION = true;  // set false to disable encryption (Option A fallback)
const CFG_ENCRYPTED_URL  = 'sOHBPcoyS0D0zWazLc5xhoQ/GRFMYBxgblSWtyE4xUObZ9SghYv88Qler/VU2TenRnMeygi28GZHX2hAdSoC27rYU+9zDW09JLLHlPuV2STWXaAU+aSD3FWbvOtMi8YPc6gCbZcnxAfEJ5irgSHmbEYB4QbS/hODpd0uvW9jSDj9G6fVlb5nMIji970NGAsyoBIWVax0itUKo1nFgmA=';    // paste your encrypted string here after running encrypt-tool.html


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
// Empty — no demo data on fresh install.
// Set to [] for a clean start or add your own entries.
const CFG_SEED = [];


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


// ── TRASH TALK ────────────────────────────────────────────────
// Set to false to disable the post-log messages entirely.
const CFG_TRASH_TALK = true;
