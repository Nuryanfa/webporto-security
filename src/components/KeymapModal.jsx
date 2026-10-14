import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Command,
  X,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  FolderKanban,
  CircleDot,
  Route,
  Radio,
  FileText,
  Printer,
  CornerDownLeft,
} from "lucide-react";
import {
  isSoundEnabled,
  setSoundEnabled,
  subscribeSound,
  playTacticalBlip,
  playNavigationChirp,
} from "../utils/audioTelemetry";
import {
  getPreferences,
  setPreferences,
  subscribePreferences,
} from "../utils/experiencePreferences";

export default function KeymapModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const soundActive = useSyncExternalStore(subscribeSound, isSoundEnabled, isSoundEnabled);
  const preferences = useSyncExternalStore(subscribePreferences, getPreferences, getPreferences);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (["1", "2", "3", "4", "o", "O", "s", "S", "m", "M", "p", "P"].includes(event.key)) {
        if (event.key === "1") {
          playNavigationChirp();
          navigate("/");
          onClose();
        } else if (event.key === "2") {
          playNavigationChirp();
          navigate("/archive");
          onClose();
        } else if (event.key === "3") {
          playNavigationChirp();
          navigate("/timeline");
          onClose();
        } else if (event.key === "4") {
          playNavigationChirp();
          navigate("/network");
          onClose();
        } else if (event.key.toLowerCase() === "o") {
          playNavigationChirp();
          navigate("/overview");
          onClose();
        } else if (event.key.toLowerCase() === "s") {
          const next = !soundActive;
          setSoundEnabled(next);
          if (next) playTacticalBlip(1200, 0.05);
        } else if (event.key.toLowerCase() === "m") {
          const modes = ["system", "full", "reduced"];
          const currIdx = modes.indexOf(preferences.motion);
          const nextMode = modes[(currIdx + 1) % modes.length];
          setPreferences({ motion: nextMode });
          playTacticalBlip(750, 0.04);
        } else if (event.key.toLowerCase() === "p") {
          window.print();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, navigate, soundActive, preferences]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#060b10]/80 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tactical-hud-title"
            className="relative w-full max-w-xl bg-[#091117] border border-resonance/40 rounded-[2px] p-6 shadow-2xl shadow-cyan-950/40 text-surface-on overflow-hidden"
          >
            {/* Tactical HUD Corner Reticles */}
            <span className="hud-corner hud-tl" />
            <span className="hud-corner hud-tr" />
            <span className="hud-corner hud-bl" />
            <span className="hud-corner hud-br" />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Command size={18} className="text-resonance" />
                <h2 id="tactical-hud-title" className="font-mono text-sm tracking-wider text-white">
                  TACTICAL COMMAND INTERFACE // HOTKEYS
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-muted hover:text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Close command interface"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Navigation Commands */}
            <div className="space-y-4 mb-6">
              <span className="font-mono text-[10px] text-resonance/80 tracking-widest block uppercase">
                01 // Direct Route Relays
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    playNavigationChirp();
                    navigate("/");
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.06] hover:border-resonance/50 hover:bg-resonance/[0.05] transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <CircleDot size={14} className="text-resonance" />
                    <span>Nexus Hub (Home)</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">1</kbd>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playNavigationChirp();
                    navigate("/archive");
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.06] hover:border-resonance/50 hover:bg-resonance/[0.05] transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban size={14} className="text-resonance" />
                    <span>Operations Matrix</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">2</kbd>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playNavigationChirp();
                    navigate("/timeline");
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.06] hover:border-resonance/50 hover:bg-resonance/[0.05] transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Route size={14} className="text-resonance" />
                    <span>Chrono Trace</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">3</kbd>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playNavigationChirp();
                    navigate("/network");
                    onClose();
                  }}
                  className="flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-white/[0.06] hover:border-resonance/50 hover:bg-resonance/[0.05] transition-colors text-left"
                >
                  <span className="flex items-center gap-2">
                    <Radio size={14} className="text-resonance" />
                    <span>Channel / Comms</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">4</kbd>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playNavigationChirp();
                    navigate("/overview");
                    onClose();
                  }}
                  className="col-span-2 flex items-center justify-between p-2.5 rounded bg-white/[0.02] border border-resonance/30 hover:border-resonance hover:bg-resonance/[0.08] transition-colors text-left"
                >
                  <span className="flex items-center gap-2 text-resonance">
                    <FileText size={14} />
                    <span className="font-medium">Executive Technical Dossier</span>
                  </span>
                  <kbd className="px-1.5 py-0.5 rounded bg-resonance/20 text-resonance font-mono text-[10px]">O</kbd>
                </button>
              </div>
            </div>

            {/* In-Page Action Hotkeys */}
            <div className="space-y-3 mb-6">
              <span className="font-mono text-[10px] text-resonance/80 tracking-widest block uppercase">
                02 // Tactical Controls & Toggles
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded bg-white/[0.015] border border-white/[0.05]">
                  <span className="text-muted">Target Cycle (Ops)</span>
                  <div className="flex gap-1 font-mono text-[10px]">
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">J</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white">K</kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-white/[0.015] border border-white/[0.05]">
                  <span className="text-muted">Print Dossier</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white">P</kbd>
                </div>

                {/* Sound Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundActive;
                    setSoundEnabled(next);
                    if (next) playTacticalBlip(1200, 0.05);
                  }}
                  className="flex items-center justify-between p-2 rounded bg-white/[0.015] border border-white/[0.05] hover:border-white/20 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 text-white">
                    {soundActive ? <Volume2 size={13} className="text-resonance" /> : <VolumeX size={13} className="text-muted" />}
                    <span>Audio Telemetry</span>
                  </span>
                  <span className="font-mono text-[10px] text-resonance">
                    [{soundActive ? "ON" : "OFF"}] <kbd className="ml-1 px-1 py-0.5 bg-white/10 rounded text-white">S</kbd>
                  </span>
                </button>

                {/* Motion Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const modes = ["system", "full", "reduced"];
                    const currIdx = modes.indexOf(preferences.motion);
                    const nextMode = modes[(currIdx + 1) % modes.length];
                    setPreferences({ motion: nextMode });
                    playTacticalBlip(750, 0.04);
                  }}
                  className="flex items-center justify-between p-2 rounded bg-white/[0.015] border border-white/[0.05] hover:border-white/20 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 text-white">
                    <SlidersHorizontal size={13} className="text-resonance" />
                    <span>Motion Mode</span>
                  </span>
                  <span className="font-mono text-[10px] text-resonance uppercase">
                    [{preferences.motion}] <kbd className="ml-1 px-1 py-0.5 bg-white/10 rounded text-white">M</kbd>
                  </span>
                </button>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-muted">
              <span>PRESS [ESC] OR [?] TO TOGGLE HUD</span>
              <span className="text-resonance/70">PROTOCOL: RONIN_07</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
