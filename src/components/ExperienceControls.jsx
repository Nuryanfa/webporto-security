import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { SlidersHorizontal, Volume2, VolumeX } from 'lucide-react';
import { getPreferences, setPreferences, subscribePreferences } from '../utils/experiencePreferences';

export default function ExperienceControls() {
  const preferences = useSyncExternalStore(subscribePreferences, getPreferences, getPreferences);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audio = useRef(null);
  const panel = useRef(null);
  const volume = useRef(preferences.volume);
  volume.current = preferences.volume;

  useEffect(() => {
    if (!audioEnabled) return;
    let last = 0;
    const sound = async event => {
      if (!event.target.closest('a, button') || document.hidden || performance.now() - last < 90) return;
      last = performance.now();
      try {
        const Audio = window.AudioContext || window.webkitAudioContext;
        if (!Audio) return;
        audio.current ||= new Audio();
        const context = audio.current;
        await context.resume();
        if (context.state !== 'running') return;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(event.target.closest('a') ? 520 : 720, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(320, context.currentTime + .085);
        gain.gain.setValueAtTime(Math.max(.0001, volume.current / 1000), context.currentTime);
        gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .09);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(); oscillator.stop(context.currentTime + .1);
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
      } catch { /* Audio is optional; blocked playback never interrupts navigation. */ }
    };
    document.addEventListener('click', sound);
    return () => { document.removeEventListener('click', sound); audio.current?.close().catch(() => {}); audio.current = null; };
  }, [audioEnabled]);

  useEffect(() => {
    const outside = event => { if (!panel.current?.contains(event.target)) panel.current?.removeAttribute('open'); };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, []);

  return <details className="experience-controls" ref={panel} onKeyDown={event => {
    if (event.key === 'Escape') { panel.current.open = false; panel.current.querySelector('summary').focus(); }
  }}>
    <summary><SlidersHorizontal size={15} /><span>Experience</span></summary>
    <div className="experience-popover">
      <p className="eyebrow">Make it yours</p>
      <label htmlFor="motion-preference">Motion</label>
      <select id="motion-preference" value={preferences.motion} onChange={event => setPreferences({ motion: event.target.value })}>
        <option value="system">Follow device</option><option value="full">Full experience</option><option value="reduced">Reduced motion</option>
      </select>
      <p className="control-hint">Motion preferences are remembered on this device.</p>
      <button className="audio-toggle" type="button" aria-pressed={audioEnabled} onClick={() => setAudioEnabled(value => !value)}>
        {audioEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}Sound {audioEnabled ? 'on' : 'off'}
      </button>
      <label htmlFor="sound-volume">Volume <span>{preferences.volume}%</span></label>
      <input id="sound-volume" type="range" min="0" max="40" step="1" value={preferences.volume} onChange={event => setPreferences({ volume: Number(event.target.value) })} />
      <p className="control-hint">Short interaction tones. Sound starts off every visit.</p>
    </div>
  </details>;
}
