import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "../luxe/gsap";
import { scrollToTop } from "../luxe/lenis";
import { episodeFor } from "../content/episodes";
import useReducedMotion from "../utils/useMotionPreference";

/**
 * Episode title card: hard cut to black with the destination's kanji, swap
 * routes and reset scroll while hidden, then tear the card away in slices.
 * Query-only changes (project deep links) swap instantly.
 * children is a render function receiving the location to display.
 */
export default function RouteTransition({ children }) {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(location);
  const [card, setCard] = useState(() => episodeFor(location.pathname));
  const curtain = useRef(null);
  const timeline = useRef(null);

  useLayoutEffect(() => {
    if (location.pathname === display.pathname) {
      if (location !== display) setDisplay(location);
      // Returned to the shown page mid-transition: drop the pending swap and lift.
      if (timeline.current?.isActive()) {
        timeline.current.kill();
        gsap.set(curtain.current, { autoAlpha: 0 });
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
    const el = curtain.current;
    const slices = el.querySelectorAll(".lx-curtain__slice");
    const tl = gsap.timeline();
    // Hard cut in: anime title cards do not fade.
    tl.set(el, { autoAlpha: 1 })
      .set(slices, { xPercent: 0 })
      .set(el.querySelectorAll(".lx-curtain__card > *"), { autoAlpha: 0 })
      .set(el.querySelector(".lx-curtain__flash"), { autoAlpha: 1 })
      .set(el.querySelector(".lx-curtain__flash"), { autoAlpha: 0 }, 0.06)
      .to(el.querySelectorAll(".lx-curtain__card > *"), { autoAlpha: 1, duration: 0.01, stagger: 0.07 }, 0.08)
      .add(() => {
        scrollToTop();
        setDisplay(location);
      }, 0.32)
      .to(el.querySelector(".lx-curtain__card"), { x: 6, skewX: -8, duration: 0.04, repeat: 3, yoyo: true }, 0.72)
      .set(el.querySelector(".lx-curtain__card"), { x: 0, skewX: 0, autoAlpha: 0 }, 0.88)
      .to(slices, { xPercent: (i) => (i % 2 ? 102 : -102), duration: 0.55, ease: "expo.in", stagger: 0.035 }, 0.86)
      .set(el, { autoAlpha: 0 })
      .set(el.querySelector(".lx-curtain__card"), { autoAlpha: 1 })
      .add(() => ScrollTrigger.refresh());
    timeline.current = tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reduced]);

  useEffect(() => () => timeline.current?.kill(), []);

  return (
    <div className="route-stage">
      <div className="route-content">{children(display)}</div>
      <div ref={curtain} className="lx-curtain" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} className="lx-curtain__slice" style={{ top: `${(i * 100) / 6}%` }} />
        ))}
        <div className="lx-curtain__flash" />
        <div className="lx-curtain__card">
          <span className="lx-title-card__ep">
            Episode {card.no} <span lang="ja">{card.ep}</span>
          </span>
          <span className="lx-title-card__kanji" lang="ja">
            {card.kanji}
          </span>
          <span className="lx-title-card__en">{card.en}</span>
          <span className="lx-title-card__rule" />
        </div>
      </div>
    </div>
  );
}
