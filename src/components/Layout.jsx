import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Command, TerminalSquare } from "lucide-react";
import useMotionPreference from "../utils/useMotionPreference";
import MotionControl from "./MotionControl";
import KeymapModal from "./KeymapModal";
import TerminalDrawer from "./TerminalDrawer";
import LuxeCursor from "./luxe/LuxeCursor";
import Preloader from "./luxe/Preloader";
import { profile } from "../content/profile";
import { episodes, episodeFor, nextEpisode } from "../content/episodes";
import { OverlayMotionContext } from "../utils/OverlayMotionContext";
import { gsap, ScrollTrigger } from "../luxe/gsap";
import { setLenis } from "../luxe/lenis";
import { playNavigationChirp } from "../utils/audioTelemetry";

const links = ["/", "/archive", "/timeline", "/network"].map((to) => ({ to, ...episodes[to] }));

const socials = [
  { href: "https://github.com/Nuryanfa", label: "GitHub" },
  { href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368", label: "LinkedIn" },
];

function useJakartaTime(withSeconds = false) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: withSeconds ? "2-digit" : undefined,
          hour12: false,
        }),
      );
    update();
    const id = setInterval(update, withSeconds ? 1000 : 15000);
    return () => clearInterval(id);
  }, [withSeconds]);
  return time || "--:--";
}

// Four viewport corner brackets with a live scroll read-out: a cockpit frame.
function HudFrame() {
  const readout = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
      if (readout.current) readout.current.textContent = `Y ${String(pct).padStart(3, "0")}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="lx-hud" aria-hidden="true">
      <i className="lx-hud__c lx-hud__c--tl" />
      <i className="lx-hud__c lx-hud__c--tr" />
      <i className="lx-hud__c lx-hud__c--bl" />
      <i className="lx-hud__c lx-hud__c--br" />
      <span className="lx-hud__read lx-hud__read--l">LAT -6.9175 · LON 107.6191</span>
      <span ref={readout} className="lx-hud__read lx-hud__read--r">
        Y 000%
      </span>
    </div>
  );
}

export default function Layout({ children }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduced = useMotionPreference();
  const time = useJakartaTime();
  const [isKeymapOpen, setIsKeymapOpen] = useState(false);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isOverlayActive = isKeymapOpen || isTermOpen || isMenuOpen;
  const lenisRef = useRef(null);
  const menuButton = useRef(null);
  const current = episodeFor(pathname);
  const next = nextEpisode(pathname);

  // Lenis drives the scroll; GSAP's ticker drives Lenis so ScrollTrigger stays in lockstep.
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      prevent: (node) => !!node.closest(".terminal-drawer, [role='dialog'], .lx-menu"),
    });
    lenisRef.current = lenis;
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (isOverlayActive) lenis.stop();
    else lenis.start();
  }, [reduced, isOverlayActive]);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [reduced]);

  // Header tucks away while reading downward and returns on any upward scroll.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHeaderHidden(y > last && y > 240);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setHeaderHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  // Global keyboard navigation
  useEffect(() => {
    const handleGlobalKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || document.activeElement?.isContentEditable) {
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
      if (isKeymapOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const routes = { 1: "/", 2: "/archive", 3: "/timeline", 4: "/network", o: "/overview", O: "/overview" };
      if (routes[e.key]) {
        playNavigationChirp();
        navigate(routes[e.key]);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [navigate, isKeymapOpen]);

  return (
    <OverlayMotionContext.Provider value={isOverlayActive}>
      <div className="lx-shell cyber-shell" data-ui-overlay={isOverlayActive ? "active" : "idle"}>
        <div className="lx-atmos" aria-hidden="true">
          <i className="lx-atmos__hex" />
          <i className="lx-atmos__glow" />
          <i className="lx-atmos__scan" />
        </div>
        <div className="lx-grain" aria-hidden="true" />
        <HudFrame />

        <Preloader />
        <LuxeCursor />
        <KeymapModal isOpen={isKeymapOpen} onClose={() => setIsKeymapOpen(false)} />
        <TerminalDrawer open={isTermOpen} onClose={() => setIsTermOpen(false)} />

        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <header className={`lx-header ${headerHidden && !isMenuOpen ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}>
          <Link to="/" className="lx-brand" aria-label={`${profile.name}, home`}>
            <span className="lx-brand__mark" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <path d="M20 2 37 11v18L20 38 3 29V11Z" />
                <path d="M12 26V14l8 12V14M24 14l4 6 4-6M28 20v6" />
              </svg>
            </span>
            <span className="lx-brand__name">
              <b>Nur Yanfa</b>
              <small>Defense division · NY-07</small>
            </span>
          </Link>

          <nav aria-label="Main" className="lx-nav">
            {links.map(({ to, label, kanji, no }) => (
              <NavLink to={to} end key={to} title={`${label} — press ${Number(no)}`}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        className="lx-nav__pill"
                        layoutId="lx-nav-pill"
                        transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="lx-nav__kanji" lang="ja">
                      {kanji}
                    </span>
                    <span className="lx-nav__text">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="lx-header__tools">
            <span className="lx-header__status" title="Local time in Bandung">
              <i /> SYS nominal · {time}
            </span>
            <button
              type="button"
              onClick={() => setIsKeymapOpen(true)}
              className="lx-icon-btn"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts (?)"
            >
              <Command size={15} />
            </button>
            <MotionControl />
            <Link to="/overview" className="lx-pill-link">
              <span lang="ja">概要</span> Brief
            </Link>
            <button
              ref={menuButton}
              type="button"
              className={`lx-menu-btn ${isMenuOpen ? "is-open" : ""}`}
              aria-expanded={isMenuOpen}
              aria-controls="lx-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
              <i />
              <i />
            </button>
          </div>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="lx-menu"
              className="lx-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{
                clipPath: "inset(0 0 100% 0)",
                transition: { duration: 0.45, delay: 0.1, ease: [0.76, 0, 0.24, 1] },
              }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="lx-menu__stripe" aria-hidden="true" />
              <nav aria-label="Menu" className="lx-menu__nav">
                {[...links, { to: "/overview", ...episodes["/overview"] }].map(({ to, label, kanji, no }, index) => (
                  <motion.div
                    key={to}
                    className="lx-menu__mask"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%", transition: { duration: 0.3, ease: [0.7, 0, 0.84, 0] } }}
                    transition={{ duration: 0.7, delay: 0.12 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink to={to} end onClick={() => setIsMenuOpen(false)}>
                      <small>EP.{no}</small>
                      <span lang="ja">{kanji}</span>
                      <em>{label}</em>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>
              <div className="lx-menu__foot">
                {socials.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                ))}
                <span>Bandung · {time}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content" className="lx-main" tabIndex={-1}>
          {children}
        </main>

        <footer className="lx-footer">
          <Link to={next.to} className="lx-next" data-cursor="Next">
            <span className="lx-next__label">
              <span lang="ja">次回予告</span> Next episode
            </span>
            <span className="lx-next__ep">
              Episode {next.no} <span lang="ja">{next.ep}</span>
            </span>
            <span className="lx-next__kanji" lang="ja">
              {next.kanji}
            </span>
            <span className="lx-next__en">
              {next.en}
              <ArrowUpRight size={40} strokeWidth={1.4} />
            </span>
          </Link>

          <div className="lx-hazard" aria-hidden="true" />

          <div className="lx-footer__grid">
            <div>
              <span className="lx-footer__label">Navigate</span>
              {links.map(({ to, label, kanji }) => (
                <Link key={to} to={to}>
                  <span lang="ja">{kanji}</span> {label}
                </Link>
              ))}
            </div>
            <div>
              <span className="lx-footer__label">Channels</span>
              {socials.map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label} ↗
                </a>
              ))}
              <Link to="/network">Email ↗</Link>
            </div>
            <div>
              <span className="lx-footer__label">Local time · UTC+7</span>
              <span className="lx-footer__time">{time}</span>
              <span>{profile.location}</span>
            </div>
            <div>
              <span className="lx-footer__label">Shortcuts</span>
              <button type="button" onClick={() => setIsKeymapOpen(true)}>
                <kbd>?</kbd> Keyboard map
              </button>
              <button type="button" className="terminal-toggle" onClick={() => setIsTermOpen((v) => !v)}>
                <TerminalSquare size={14} /> <kbd>`</kbd> Terminal
              </button>
            </div>
          </div>

          <div className="lx-footer__wordmark" aria-hidden="true">
            <span lang="ja">防衛</span>
            <span>Nur Yanfa</span>
          </div>

          <div className="lx-footer__base">
            <span>© 2026 {profile.name}</span>
            <span>
              Now showing: EP.{current.no} {current.en}
            </span>
            <span>Built with React · GSAP · Three.js</span>
          </div>
        </footer>
      </div>
    </OverlayMotionContext.Provider>
  );
}
