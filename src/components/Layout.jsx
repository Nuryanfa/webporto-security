import { useEffect, useState } from "react";
import useMotionPreference from "../utils/useMotionPreference";
import CyberCursor from "./CyberCursor";
import MotionControl from "./MotionControl";
import SignalLattice from "./SignalLattice";
import ScanlineOverlay from "./ScanlineOverlay";
import KeymapModal from "./KeymapModal";
import TerminalDrawer from "./TerminalDrawer";
import useHoloTilt from "../utils/useHoloTilt";
import { profile } from "../content/profile";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  CircleDot,
  FolderKanban,
  Route,
  Radio,
  ArrowUpRight,
  Command,
} from "lucide-react";
import { playNavigationChirp } from "../utils/audioTelemetry";

const links = [
  { to: "/", label: "Nexus", detail: "Home", icon: CircleDot },
  {
    to: "/archive",
    label: "Operations",
    detail: "Projects",
    icon: FolderKanban,
  },
  { to: "/timeline", label: "Trace", detail: "Experience", icon: Route },
  { to: "/network", label: "Channel", detail: "Contact", icon: Radio },
];

function CyberClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour12: false,
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="cyber-telemetry-badge hidden md:inline-flex"
      title="Bandung Local Time & Node Telemetry"
    >
      <i />
      <span>BDG {time || "00:00:00"} UTC+7 // NODE 0x7F</span>
    </span>
  );
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduced = useMotionPreference();
  const [isKeymapOpen, setIsKeymapOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  useHoloTilt(reduced);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);

  // Global Keyboard Navigation
  useEffect(() => {
    const handleGlobalKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(tag) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      if (e.key === "`") {
        e.preventDefault();
        setIsTermOpen((prev) => !prev);
        return;
      }

      if (e.key === "?" || (e.key === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        setIsKeymapOpen((prev) => !prev);
        return;
      }

      if (isKeymapOpen) return;

      if (e.key === "1") {
        playNavigationChirp();
        navigate("/");
      } else if (e.key === "2") {
        playNavigationChirp();
        navigate("/archive");
      } else if (e.key === "3") {
        playNavigationChirp();
        navigate("/timeline");
      } else if (e.key === "4") {
        playNavigationChirp();
        navigate("/network");
      } else if (e.key === "o" || e.key === "O") {
        playNavigationChirp();
        navigate("/overview");
      }
    };

    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [navigate, isKeymapOpen]);

  const active = links.find((x) => x.to === pathname);

  return (
    <div className="cyber-shell relative">
      {/* Ambient Cyber Canvas Lattice & Scanline Overlay */}
      <SignalLattice />
      <ScanlineOverlay />
      <CyberCursor />
      <KeymapModal isOpen={isKeymapOpen} onClose={() => setIsKeymapOpen(false)} />
      <TerminalDrawer open={isTermOpen} onClose={() => setIsTermOpen(false)} />

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Cyber Vertical Rail */}
      <aside className="cyber-rail">
        <Link
          to="/"
          className="cyber-monogram group relative"
          aria-label="Nur Yanfa home"
        >
          <span className="hud-corner hud-tl" aria-hidden="true" />
          <span className="hud-corner hud-br" aria-hidden="true" />
          NY<span className="font-mono">07</span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(({ to, label, detail, icon: Icon }) => (
            <NavLink
              to={to}
              end
              key={to}
              title={`${label} / ${detail}`}
              className="relative group"
            >
              <Icon size={19} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="rail-caption flex items-center gap-2">
          <span>BACKEND × DEVSECOPS</span>
        </div>
      </aside>

      {/* Main App Body */}
      <div className="cyber-body">
        <header className="cyber-topbar">
          <span className="flex items-center gap-2 font-mono text-xs">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
            PORTFOLIO <b>/</b> {active?.label || "Overview"}
          </span>

          <CyberClock />

          <span className="top-location">
            <i /> BANDUNG, ID
          </span>

          <button
            type="button"
            onClick={() => setIsKeymapOpen(true)}
            className="hotkey-trigger hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-muted hover:text-resonance px-2 py-1 rounded border border-white/10 hover:border-resonance/40 bg-white/[0.02] transition-colors cursor-pointer"
            title="Open Tactical Command HUD / Hotkeys (?)"
          >
            <Command size={12} className="text-resonance" />
            <span>HOTKEYS</span>
            <kbd className="px-1 py-0.2 bg-white/10 rounded text-[9px] text-white">?</kbd>
          </button>

          <MotionControl />

          <Link to="/overview" className="overview-shortcut">
            <span className="hidden sm:inline">Quick overview</span>
            <span className="sm:hidden">Overview</span>
            <ArrowUpRight size={13} />
          </Link>
        </header>

        <main id="main-content" className="cyber-main">
          {children}
        </main>

        <footer className="cyber-footer">
          <span className="flex items-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-resonance" />
            {profile.name.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={() => setIsKeymapOpen(true)}
            className="text-[10px] font-mono text-muted hover:text-resonance transition-colors hidden lg:inline-block cursor-pointer"
            title="Toggle Keyboard Shortcuts"
          >
            [KEYS: 1-4 // O: DOSSIER // ?: HUD]
          </button>
          <button
            type="button"
            onClick={() => setIsKeymapOpen(true)}
            className="text-[10px] font-mono text-muted hover:text-resonance transition-colors hidden md:inline-block lg:hidden cursor-pointer"
            title="Toggle Keyboard Shortcuts"
          >
            [HOTKEYS ?]
          </button>
          <button
            type="button"
            onClick={() => setIsTermOpen((v) => !v)}
            className="terminal-toggle text-muted hover:text-resonance transition-colors hidden sm:inline-block cursor-pointer"
            title="Toggle terminal (`)"
          >
            [` TERMINAL]
          </button>
          <span className="text-resonance/80 hidden xl:inline">
            {profile.role.toUpperCase()} // PROTOCOL: RONIN
          </span>
          <span className="text-resonance/80 hidden sm:inline xl:hidden">
            RONIN // 0x7F
          </span>
          <a
            href="https://github.com/Nuryanfa"
            target="_blank"
            rel="noreferrer"
            className="hover:text-resonance transition-colors flex items-center gap-1"
          >
            GITHUB ↗
          </a>
        </footer>
      </div>
    </div>
  );
}
