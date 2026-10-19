// "Pattern red" drill: a site-wide easter egg (Konami code, or `breach` in the terminal).
// Purely cosmetic; it recolours the UI, intensifies the hero barrier and auto-clears.

const DURATION = 9000;
let active = false;
let timer = 0;
const listeners = new Set();

function emit() {
  listeners.forEach((fn) => fn(active));
}

export function isEmergency() {
  return active;
}

export function subscribeEmergency(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function triggerEmergency() {
  clearTimeout(timer);
  active = true;
  document.documentElement.dataset.alert = "red";
  emit();
  timer = setTimeout(clearEmergency, DURATION);
}

export function clearEmergency() {
  clearTimeout(timer);
  if (!active) return;
  active = false;
  delete document.documentElement.dataset.alert;
  emit();
}
