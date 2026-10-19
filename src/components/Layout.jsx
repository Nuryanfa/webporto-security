import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Command, Github, Linkedin, TerminalSquare } from "lucide-react";
import useMotionPreference from "../utils/useMotionPreference";
import MotionControl from "./MotionControl";
import KeymapModal from "./KeymapModal";
import TerminalDrawer from "./TerminalDrawer";
import LuxeCursor from "./luxe/LuxeCursor";
import Preloader from "./luxe/Preloader";
import SplitReveal from "./luxe/SplitReveal";
import { profile } from "../content/profile";
import { OverlayMotionContext } from "../utils/OverlayMotionContext";
import { gsap, ScrollTrigger } from "../luxe/gsap";
import { setLenis } from "../luxe/lenis";
import { playNavigationChirp } from "../utils/audioTelemetry";

const links = [
  { to: "/", label: "Home", code: "Nexus" },
  { to: "/archive", label: "Work", code: "Operations" },
  { to: "/timeline", label: "Experience", code: "Trace" },
  { to: "/network", label: "Contact", code: "Channel" },
];

const socials = [
  { href: "https://github.com/Nuryanfa", label: "GitHub", icon: Github },
  {
    href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

function useJakartaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
  }, []);
  return time || "--:--";
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
    const tick = (time) => lenis.raf(time * 1000);
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
          <i className="lx-atmos__aurora lx-atmos__aurora--a" />
          <i className="lx-atmos__aurora lx-atmos__aurora--b" />
          <i className="lx-atmos__aurora lx-atmos__aurora--c" />
          <i className="lx-atmos__grid" />
        </div>
        <div className="lx-grain" aria-hidden="true" />

        <Preloader />
        <LuxeCursor />
        <KeymapModal isOpen={isKeymapOpen} onClose={() => setIsKeymapOpen(false)} />
        <TerminalDrawer open={isTermOpen} onClose={() => setIsTermOpen(false)} />

        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <header
          className={`lx-header ${headerHidden && !isMenuOpen ? "is-hidden" : ""} ${scrolled ? "is-scrolled" : ""}`}
        >
          <Link to="/" className="lx-brand" aria-label={`${profile.name}, home`}>
            <span className="lx-brand__mark">
              NY<sup>07</sup>
            </span>
            <span className="lx-brand__name">
              Nur Yanfa
              <small>{profile.role}</small>
            </span>
          </Link>

          <nav aria-label="Main" className="lx-nav">
            {links.map(({ to, label, code }, index) => (
              <NavLink to={to} end key={to} title={`${code} — press ${index + 1}`}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        className="lx-nav__pill"
                        layoutId="lx-nav-pill"
                        transition={
                          reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }
                        }
                      />
                    )}
                    <span className="lx-nav__text">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="lx-header__tools">
            <span className="lx-header__time" title="Local time in Bandung">
              <i /> BDG {time}
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
              Overview <ArrowUpRight size={14} />
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
                transition: { duration: 0.55, delay: 0.12, ease: [0.76, 0, 0.24, 1] },
              }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            >
              <nav aria-label="Menu" className="lx-menu__nav">
                {[...links, { to: "/overview", label: "Overview", code: "Brief" }].map(
                  ({ to, label, code }, index) => (
                    <motion.div
                      key={to}
                      className="lx-menu__mask"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%", transition: { duration: 0.35, ease: [0.7, 0, 0.84, 0] } }}
                      transition={{ duration: 0.8, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <NavLink to={to} end onClick={() => setIsMenuOpen(false)}>
                        <small>0{index + 1}</small>
                        {label}
                        <em>{code}</em>
                      </NavLink>
                    </motion.div>
                  ),
                )}
              </nav>
              <div className="lx-menu__foot">
                {socials.map(({ href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer">
                    {label} ↗
                  </a>
                ))}
                <span>Bandung, ID · {time}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="main-content" className="lx-main" tabIndex={-1}>
          {children}
        </main>

        <footer className="lx-footer">
          {pathname !== "/network" && (
            <div className="lx-footer__cta">
              <span className="lx-eyebrow">Have a system that needs to hold up?</span>
              <Link to="/network" className="lx-footer__big" data-cursor="Say hi">
                <SplitReveal as="span" type="chars" start="top 95%">
                  Let’s talk
                </SplitReveal>
                <span className="lx-footer__arrow">
                  <ArrowUpRight size={36} strokeWidth={1.4} />
                </span>
              </Link>
            </div>
          )}

          <div className="lx-footer__grid">
            <div>
              <span className="lx-footer__label">Navigate</span>
              {links.map(({ to, label }) => (
                <Link key={to} to={to}>
                  {label}
                </Link>
              ))}
            </div>
            <div>
              <span className="lx-footer__label">Elsewhere</span>
              {socials.map(({ href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label} ↗
                </a>
              ))}
            </div>
            <div>
              <span className="lx-footer__label">Local time</span>
              <span className="lx-footer__time">{time}</span>
              <span>Bandung, Indonesia · UTC+7</span>
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
            Nur Yanfa
          </div>

          <div className="lx-footer__base">
            <span>© 2026 {profile.name}</span>
            <span>Built with React, GSAP &amp; Three.js</span>
            <span>Backend × DevSecOps</span>
          </div>
        </footer>
      </div>
    </OverlayMotionContext.Provider>
  );
}
