import { useEffect } from "react";
import useMotionPreference from "../utils/useMotionPreference";
import CyberCursor from "./CyberCursor";
import MotionControl from "./MotionControl";
import { profile } from "../content/profile";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  CircleDot,
  FolderKanban,
  Route,
  Radio,
  ArrowUpRight,
} from "lucide-react";
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
export default function Layout({ children }) {
  const { pathname } = useLocation();
  const reduced = useMotionPreference();
  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);
  const active = links.find((x) => x.to === pathname);
  return (
    <div className="cyber-shell">
      <CyberCursor />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <aside className="cyber-rail">
        <Link to="/" className="cyber-monogram" aria-label="Nur Yanfa home">
          NY<span>07</span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(({ to, label, detail, icon: Icon }) => (
            <NavLink to={to} end key={to} title={`${label} / ${detail}`}>
              <Icon size={19} strokeWidth={1.5} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <span className="rail-caption">BACKEND × DEVSECOPS</span>
      </aside>
      <div className="cyber-body">
        <header className="cyber-topbar">
          <span>
            PORTFOLIO <b>/</b> {active?.label || "Overview"}
          </span>
          <span className="top-location">
            <i /> BANDUNG, ID
          </span>
          <MotionControl />
          <Link to="/overview" className="overview-shortcut">
            Quick overview
            <ArrowUpRight size={13} />
          </Link>
        </header>
        <main id="main-content" className="cyber-main">
          {children}
        </main>
        <footer className="cyber-footer">
          <span>{profile.name.toUpperCase()}</span>
          <span>{profile.role.toUpperCase()}</span>
          <a
            href="https://github.com/Nuryanfa"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>
        </footer>
      </div>
    </div>
  );
}
