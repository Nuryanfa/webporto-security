import { useEffect, useRef, useSyncExternalStore } from "react";
import { useNavigate } from "react-router-dom";
import { Command, X, Volume2, VolumeX, SlidersHorizontal, Printer, Siren } from "lucide-react";
import { gsap } from "../luxe/gsap";
import usePresence from "../luxe/usePresence";
import { episodes } from "../content/episodes";
import { triggerEmergency } from "../luxe/emergency";
import {
  isSoundEnabled,
  setSoundEnabled,
  subscribeSound,
  playTacticalBlip,
  playNavigationChirp,
} from "../utils/audioTelemetry";
import { getPreferences, setPreferences, subscribePreferences } from "../utils/experiencePreferences";

const ROUTE_KEYS = [
  ["1", "/"],
  ["2", "/archive"],
  ["3", "/timeline"],
  ["4", "/network"],
  ["O", "/overview"],
];
const MODES = ["system", "full", "reduced"];

export default function KeymapModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const soundActive = useSyncExternalStore(subscribeSound, isSoundEnabled, isSoundEnabled);
  const preferences = useSyncExternalStore(subscribePreferences, getPreferences, getPreferences);
  const closeButton = useRef(null);
  const [mounted, root] = usePresence(isOpen, {
    enter: (el) =>
      gsap
        .timeline()
        .from(el.querySelector(".lx-keymap__backdrop"), { autoAlpha: 0, duration: 0.25 })
        .from(el.querySelector(".lx-keymap__panel"), { y: 24, autoAlpha: 0, duration: 0.5, ease: "expo.out" }, 0)
        .from(el.querySelectorAll(".lx-keymap__row"), { x: -12, autoAlpha: 0, duration: 0.4, stagger: 0.03 }, 0.1),
    exit: (el) =>
      gsap
        .timeline()
        .to(el.querySelector(".lx-keymap__panel"), { y: 16, autoAlpha: 0, duration: 0.2, ease: "power2.in" })
        .to(el.querySelector(".lx-keymap__backdrop"), { autoAlpha: 0, duration: 0.2 }, 0),
  });

  const go = (to) => {
    navigate(to);
    onClose();
  };
  const toggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    if (next) playTacticalBlip(1200, 0.05);
  };
  const cycleMotion = () => {
    const next = MODES[(MODES.indexOf(preferences.motion) + 1) % MODES.length];
    setPreferences({ motion: next });
    playTacticalBlip(750, 0.04);
  };
  const drill = () => {
    onClose();
    triggerEmergency();
  };

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement;
    closeButton.current?.focus();
    const onKey = (event) => {
      const key = event.key.toLowerCase();
      if (key === "escape") return onClose();
      const route = ROUTE_KEYS.find(([k]) => k.toLowerCase() === key);
      if (route) {
        playNavigationChirp();
        return go(route[1]);
      }
      if (key === "s") toggleSound();
      else if (key === "m") cycleMotion();
      else if (key === "p") window.print();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, soundActive, preferences]);

  if (!mounted) return null;

  return (
    <div ref={root} className="lx-keymap">
      <div className="lx-keymap__backdrop" onClick={onClose} aria-hidden="true" />
      <div className="lx-keymap__panel" role="dialog" aria-modal="true" aria-labelledby="lx-keymap-title">
        <header className="lx-keymap__head">
          <span id="lx-keymap-title">
            <Command size={15} /> Command map <span lang="ja">操作一覧</span>
          </span>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="Close command map">
            <X size={16} />
          </button>
        </header>

        <span className="lx-keymap__label">Episodes</span>
        <div className="lx-keymap__grid">
          {ROUTE_KEYS.map(([key, to]) => (
            <button key={to} type="button" className="lx-keymap__row" onClick={() => go(to)}>
              <span lang="ja">{episodes[to].kanji}</span>
              <span>{episodes[to].label}</span>
              <kbd>{key}</kbd>
            </button>
          ))}
          <button type="button" className="lx-keymap__row is-alert" onClick={drill}>
            <Siren size={15} />
            <span>Red alert drill</span>
            <kbd>↑↑↓↓</kbd>
          </button>
        </div>

        <span className="lx-keymap__label">Controls</span>
        <div className="lx-keymap__grid">
          <div className="lx-keymap__row is-static">
            <span>Cycle targets (Work)</span>
            <kbd>J</kbd>
            <kbd>K</kbd>
          </div>
          <button type="button" className="lx-keymap__row" onClick={() => window.print()}>
            <Printer size={15} />
            <span>Print brief</span>
            <kbd>P</kbd>
          </button>
          <button type="button" className="lx-keymap__row" onClick={toggleSound} aria-pressed={soundActive}>
            {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>UI sound · {soundActive ? "on" : "off"}</span>
            <kbd>S</kbd>
          </button>
          <button type="button" className="lx-keymap__row" onClick={cycleMotion}>
            <SlidersHorizontal size={15} />
            <span>Motion · {preferences.motion}</span>
            <kbd>M</kbd>
          </button>
          <div className="lx-keymap__row is-static">
            <span>Terminal</span>
            <kbd>`</kbd>
          </div>
        </div>

        <footer className="lx-keymap__foot">
          <span>Esc or ? to close</span>
          <span>Agent NY-07 · on call</span>
        </footer>
      </div>
    </div>
  );
}
