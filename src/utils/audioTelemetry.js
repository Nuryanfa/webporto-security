// Lightweight Web Audio API synthesizer for cybernetic UI feedback
// Pure synthesized audio waveforms - zero external assets or bundle overhead.

let audioCtx = null;
let soundEnabled = false;

try {
  soundEnabled = localStorage.getItem('ny-sound-enabled') === 'true';
} catch {
  soundEnabled = false;
}

const listeners = new Set();

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(val) {
  soundEnabled = Boolean(val);
  try {
    localStorage.setItem('ny-sound-enabled', String(soundEnabled));
  } catch {}
  listeners.forEach((fn) => fn(soundEnabled));
}

export function subscribeSound(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioCtx = new AudioCtx();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playTacticalBlip(freq = 880, duration = 0.04) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx || ctx.state !== 'running') return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.018, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  } catch {
    // Audio playback is optional; errors should not interrupt execution
  }
}

export function playNavigationChirp() {
  if (!soundEnabled) return;
  playTacticalBlip(980, 0.05);
}
