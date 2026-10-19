import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger, setCurtain } from "../luxe/gsap";
import { scrollToTop } from "../luxe/lenis";
import { episodeFor } from "../content/episodes";
import useReducedMotion from "../utils/useMotionPreference";
import { playNavigationChirp } from "../utils/audioTelemetry";

/**
 * Episode transition with one continuous direction of travel:
 *   1. the old page lifts and fades while skewed panels sweep in from the right
 *      (an orange lead panel, then the black card panel);
 *   2. the title card rises out of a mask; routes swap and scroll resets unseen;
 *   3. the card drops away and the panels keep travelling left, uncovering the
 *      new page, whose entrance reveals start as it comes into view.
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

    const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });
    tl.set(el, { autoAlpha: 1 })
      .set(q(".lx-curtain__panel"), { xPercent: 110 })
      .set(q(".lx-curtain__mask > *"), { yPercent: 110 })
      .set(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "left center" })
      // 1. Cover
      .to(content, { y: -36, opacity: 0.25, duration: 0.6, ease: "power3.in" }, 0)
      .to(q(".lx-curtain__panel--lead"), { xPercent: 0, duration: 0.7 }, 0)
      .to(q(".lx-curtain__panel--main"), { xPercent: 0, duration: 0.7 }, 0.07)
      // 2. Title card
      .to(q(".lx-curtain__mask > *"), { yPercent: 0, duration: 0.7, ease: "expo.out", stagger: 0.06 }, 0.48)
      .to(q(".lx-curtain__rule"), { scaleX: 1, duration: 0.7, ease: "expo.out" }, 0.55)
      .add(() => {
        scrollToTop();
        // Opacity, not autoAlpha: visibility is inherited, and tweens created on the new
        // page while it is hidden would record "hidden" as their starting state.
        gsap.set(content, { y: 56, opacity: 0 });
        setDisplay(location);
      }, 0.62)
      // 3. Reveal, still travelling left
      .to(q(".lx-curtain__mask > *"), { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.03 }, 1.1)
      .to(q(".lx-curtain__rule"), { scaleX: 0, transformOrigin: "right", duration: 0.4, ease: "power3.in" }, 1.1)
      .to(q(".lx-curtain__panel--main"), { xPercent: -110, duration: 0.8 }, 1.3)
      .to(q(".lx-curtain__panel--lead"), { xPercent: -110, duration: 0.8 }, 1.36)
      .add(() => setCurtain(false), 1.45)
      .to(content, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" }, 1.45)
      .set(el, { autoAlpha: 0 })
      .set(q(".lx-curtain__rule"), { transformOrigin: "left" })
      .add(() => {
        gsap.set(content, { clearProps: "transform,opacity" });
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
        <div className="lx-curtain__card">
          <span className="lx-curtain__mask">
            <span className="lx-title-card__ep">
              Episode {card.no} <span lang="ja">{card.ep}</span>
            </span>
          </span>
          <span className="lx-curtain__mask">
            <span className="lx-title-card__kanji" lang="ja">
              {card.kanji}
            </span>
          </span>
          <span className="lx-curtain__mask">
            <span className="lx-title-card__en">{card.en}</span>
          </span>
          <span className="lx-curtain__rule" />
        </div>
      </div>
    </div>
  );
}
