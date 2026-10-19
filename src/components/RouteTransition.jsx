import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "../luxe/gsap";
import { scrollToTop } from "../luxe/lenis";
import useReducedMotion from "../utils/useMotionPreference";

const names = {
  "/": "Home",
  "/archive": "Selected work",
  "/timeline": "Experience",
  "/network": "Contact",
  "/overview": "Overview",
};

/**
 * Curtain transition: cover the old page, swap routes and reset scroll while
 * hidden, then lift. Query-only changes (project deep links) swap instantly.
 * children is a render function receiving the location to display.
 */
export default function RouteTransition({ children }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(location);
  const curtain = useRef(null);
  const label = useRef(null);
  const timeline = useRef(null);

  useLayoutEffect(() => {
    if (location.pathname === display.pathname) {
      if (location !== display) setDisplay(location);
      // Returned to the shown page mid-transition: drop the pending swap and lift.
      if (timeline.current?.isActive()) {
        timeline.current.kill();
        gsap.to(curtain.current, { yPercent: -100, duration: 0.6, ease: "expo.inOut" });
        gsap.set(label.current, { opacity: 0 });
      }
      return;
    }
    timeline.current?.kill();
    if (reduced || !curtain.current) {
      scrollToTop();
      setDisplay(location);
      return;
    }
    if (label.current) label.current.textContent = names[location.pathname] || "Not found";
    const tl = gsap.timeline();
    tl.set(curtain.current, { autoAlpha: 1, yPercent: 100 })
      .set(label.current, { yPercent: 120, opacity: 1 })
      .to(curtain.current, { yPercent: 0, duration: 0.62, ease: "expo.inOut" })
      .to(label.current, { yPercent: 0, duration: 0.55, ease: "expo.out" }, "-=0.25")
      .add(() => {
        scrollToTop();
        setDisplay(location);
      })
      .to(label.current, { yPercent: -120, opacity: 0, duration: 0.45, ease: "power3.in" }, "+=0.08")
      .to(curtain.current, { yPercent: -100, duration: 0.85, ease: "expo.inOut" }, "-=0.2")
      .set(curtain.current, { autoAlpha: 0 })
      .add(() => ScrollTrigger.refresh());
    timeline.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduced]);

  useEffect(() => () => timeline.current?.kill(), []);

  return (
    <div className="route-stage">
      <div className="route-content">{children(display)}</div>
      <div ref={curtain} className="lx-curtain" aria-hidden="true">
        <div className="lx-curtain__glow" />
        <span className="lx-curtain__mask">
          <span ref={label} className="lx-curtain__label" />
        </span>
      </div>
    </div>
  );
}
