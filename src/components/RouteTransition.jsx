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
 *   1. two black halves close on the middle of the screen while a bright line
 *      flares and shrinks (the page itself is never transformed, so nothing
 *      heavy is repainted per frame);
 *   2. on the dark screen the route swaps unseen and the timeline waits until
 *      the new page has rendered and painted; then the title card rises;
 *   3. the card drops away, the line returns and the halves open on the new page.
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
  const running = useRef(false);

  // Reset every curtain part, so nothing set visible mid-run can outlive a kill.
  const lift = () => {
    const q = gsap.utils.selector(curtain.current);
    gsap.set(curtain.current, { autoAlpha: 0 });
    gsap.set(q(".lx-curtain__half"), { scaleY: 0 });
    gsap.set(q(".lx-curtain__line"), { autoAlpha: 0, scaleX: 0 });
    gsap.set(q(".lx-curtain__mask > *"), { yPercent: 110 });
    gsap.set(stage.current, { clearProps: "all" });
    running.current = false;
    setCurtain(false);
  };

  useLayoutEffect(() => {
    if (location.pathname === display.pathname) {
      if (location !== display) setDisplay(location);
      // Returned to the shown page mid-transition: drop the pending swap and lift.
      if (running.current) {
        timeline.current?.kill();
        lift();
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

    running.current = true;
    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.set(el, { autoAlpha: 1 })
      .set(q(".lx-curtain__half"), { scaleY: 0 })
      .set(q(".lx-curtain__mask > *"), { yPercent: 110 })
      .set(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "left center" })
      .set(q(".lx-curtain__line"), { scaleX: 0, autoAlpha: 1 })
      // 1. Switch off: the halves meet in the middle.
      .to(q(".lx-curtain__half"), { scaleY: 1, duration: 0.32, ease: "power3.in" }, 0)
      .to(q(".lx-curtain__line"), { scaleX: 1, duration: 0.2, ease: "power3.out" }, 0.22)
      .to(q(".lx-curtain__line"), { scaleX: 0, duration: 0.26, ease: "power3.in" }, 0.42)
      // 2. Swap the route on the black screen and hold until it has rendered,
      //    so mount work never stutters a moving title card.
      .add(() => {
        tl.pause();
        scrollToTop();
        setDisplay(location);
        // Two frames after React commits: the new page is laid out and painted.
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (timeline.current !== tl) return;
            ScrollTrigger.refresh();
            tl.resume();
          }),
        );
      }, 0.36)
      .to(q(".lx-curtain__mask > *"), { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, 0.6)
      .to(q(".lx-curtain__rule"), { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.66)
      // 3. Switch on: the line flares, the halves open.
      .to(q(".lx-curtain__mask > *"), { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.03 }, 1.2)
      .to(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power3.in" }, 1.2)
      .to(q(".lx-curtain__line"), { scaleX: 1, duration: 0.22, ease: "power3.out" }, 1.5)
      .add(() => setCurtain(false), 1.72)
      .to(q(".lx-curtain__half"), { scaleY: 0, duration: 0.55, ease: "expo.out" }, 1.72)
      .to(q(".lx-curtain__line"), { autoAlpha: 0, duration: 0.3, ease: "power2.out" }, 1.74)
      .set(el, { autoAlpha: 0 })
      .set(q(".lx-curtain__rule"), { transformOrigin: "left" })
      .add(() => {
        running.current = false;
      });
    timeline.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduced]);

  useEffect(
    () => () => {
      timeline.current?.kill();
      running.current = false;
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
        <i className="lx-curtain__half lx-curtain__half--top" />
        <i className="lx-curtain__half lx-curtain__half--bottom" />
        <i className="lx-curtain__line" />
        <div className="lx-curtain__card">
          <TitleCard episode={card} maskClass="lx-curtain__mask" />
          <span className="lx-curtain__rule" />
        </div>
      </div>
    </div>
  );
}
