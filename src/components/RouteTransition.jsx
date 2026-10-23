import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, setCurtain } from "../luxe/gsap";
import { scrollToTop } from "../luxe/lenis";
import { episodeFor } from "../content/episodes";
import TitleCard from "./luxe/TitleCard";
import useReducedMotion from "../utils/useMotionPreference";
import { playNavigationChirp } from "../utils/audioTelemetry";

/**
 * Episode transition as a CRT channel switch:
 *   1. the old page collapses to a bright horizontal line, which shrinks away;
 *   2. on the dark screen the title card rises out of a mask; routes swap and
 *      scroll resets unseen;
 *   3. the card drops away, the line returns and the new page opens out of it,
 *      whose entrance reveals start as it comes into view.
 * Query-only changes (project deep links) swap instantly.
 * children is a render function receiving the location to display.
 */
export default function RouteTransition({ children }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(location);
  const [card, setCard] = useState(() => episodeFor(location.pathname));
  const stage = useRef(null);
  const curtain = useRef(null);
  const timeline = useRef(null);

  useLayoutEffect(() => {
    if (location.pathname === display.pathname) {
      if (location !== display) setDisplay(location);
      // Returned to the shown page mid-transition: drop the pending swap and lift.
      if (timeline.current?.isActive()) {
        timeline.current.kill();
        gsap.set(curtain.current, { autoAlpha: 0 });
        gsap.set(stage.current, { clearProps: "all" });
        setCurtain(false);
      }
      return;
    }
    timeline.current?.kill();
    if (reduced || !curtain.current) {
      scrollToTop();
      setDisplay(location);
      return;
    }

    setCard(episodeFor(location.pathname));
    playNavigationChirp();
    setCurtain(true);
    const el = curtain.current;
    const q = gsap.utils.selector(el);
    const content = stage.current;

    // The page squashes towards the middle of the viewport, wherever it is scrolled.
    const centre = (y) => `50% ${y + window.innerHeight / 2}px`;
    const off = 0.004;

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.set(el, { autoAlpha: 1 })
      .set(q(".lx-curtain__panel--lead"), { autoAlpha: 0 })
      .set(q(".lx-curtain__panel--main"), { xPercent: 0, autoAlpha: 0 })
      .set(q(".lx-curtain__mask > *"), { yPercent: 110 })
      .set(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "left center" })
      .set(q(".lx-curtain__line"), { scaleX: 0, autoAlpha: 1 })
      .set(content, { transformOrigin: centre(window.scrollY) })
      // 1. Switch off
      .to(content, { scaleY: off, duration: 0.32, ease: "power3.in" }, 0)
      .to(q(".lx-curtain__line"), { scaleX: 1, duration: 0.2, ease: "power3.out" }, 0.22)
      .set(q(".lx-curtain__panel--main"), { autoAlpha: 1 }, 0.32)
      .to(q(".lx-curtain__line"), { scaleX: 0, duration: 0.26, ease: "power3.in" }, 0.42)
      // 2. Title card
      .to(q(".lx-curtain__mask > *"), { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, 0.6)
      .to(q(".lx-curtain__rule"), { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.66)
      .add(() => {
        scrollToTop();
        // Transform only, never autoAlpha: visibility is inherited, and tweens created
        // on the new page while it is hidden would record "hidden" as their start state.
        gsap.set(content, { scaleY: off, transformOrigin: centre(0) });
        setDisplay(location);
      }, 0.74)
      // 3. Switch on
      .to(q(".lx-curtain__mask > *"), { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.03 }, 1.2)
      .to(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power3.in" }, 1.2)
      .to(q(".lx-curtain__line"), { scaleX: 1, duration: 0.22, ease: "power3.out" }, 1.5)
      .set(q(".lx-curtain__panel--main"), { autoAlpha: 0 }, 1.72)
      .add(() => setCurtain(false), 1.72)
      .to(content, { scaleY: 1, duration: 0.55, ease: "expo.out" }, 1.72)
      .to(q(".lx-curtain__line"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 1.74)
      .set(el, { autoAlpha: 0 })
      .set(q(".lx-curtain__rule"), { transformOrigin: "left" })
      .add(() => {
        gsap.set(content, { clearProps: "transform,transformOrigin" });
        ScrollTrigger.refresh();
      });
    timeline.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduced]);

  useEffect(
    () => () => {
      timeline.current?.kill();
      setCurtain(false);
    },
    [],
  );

  return (
    <div className="route-stage">
      <div ref={stage} className="route-content">
        {children(display)}
      </div>
      <div ref={curtain} className="lx-curtain" aria-hidden="true">
        <i className="lx-curtain__panel lx-curtain__panel--lead" />
        <i className="lx-curtain__panel lx-curtain__panel--main" />
        <i className="lx-curtain__line" />
        <div className="lx-curtain__card">
          <TitleCard episode={card} maskClass="lx-curtain__mask" />
          <span className="lx-curtain__rule" />
        </div>
      </div>
    </div>
  );
}
