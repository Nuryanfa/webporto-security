const defaults = { motion: 'system', volume: 15 };
let preferences = defaults;
try {
  const saved = JSON.parse(localStorage.getItem('ny-experience') || '{}');
  preferences = { motion: ['system', 'full', 'reduced'].includes(saved.motion) ? saved.motion : 'system', volume: Number.isFinite(saved.volume) ? Math.max(0, Math.min(40, saved.volume)) : 15 };
} catch { /* Storage may be unavailable in privacy mode. */ }
const listeners = new Set();
export const getPreferences = () => preferences;
export const subscribePreferences = listener => { listeners.add(listener); return () => listeners.delete(listener); };
export function setPreferences(update) {
  preferences = { ...preferences, ...update };
  try { localStorage.setItem('ny-experience', JSON.stringify(preferences)); } catch { /* Keep in-memory preferences. */ }
  listeners.forEach(listener => listener());
}
