import { useLayoutEffect, useRef, useState } from "react";
import { gsap, markIntroDone } from "../../luxe/gsap";
import { lockScroll } from "../../luxe/lenis";
import useMotionPreference from "../../utils/useMotionPreference";
import TitleCard from "./TitleCard";
import { episodes } from "../../content/episodes";

const SEEN_KEY = "lx-intro-seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * First visit per session: an "NY-07" tape slides into the deck and plays,
 * VHS tracking rolls, the episode title card appears, then the screen
 * collapses to a line and opens on the site (the same CRT language as the
 * route transition). About 2.4s; any key, click or tap fast-forwards it.
 */
export default function Preloader() {
  const reduced = useMotionPreference();
  const [visible, setVisible] = useState(() => !alreadySeen());
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!visible || reduced) {
      markIntroDone();
      if (visible) setVisible(false);
      return;
    }
    lockScroll(true);
    let tl;
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
          setVisible(false);
        },
      });
      // 1. The tape rises into view, then pushes into the slot.
      tl.from(".lx-pre__tape", { yPercent: 120, rotate: -6, duration: 0.5, ease: "back.out(1.5)" })
        .to(".lx-pre__tape", { yPercent: -112, duration: 0.34, ease: "power2.in" }, "+=0.16")
        // 2. Deck clicks to PLAY; tracking noise rolls across the screen.
        .add(() => root.current?.querySelector(".lx-pre__led")?.classList.add("is-on"))
        .to(".lx-pre__deck", { autoAlpha: 0, duration: 0.18 }, "+=0.12")
        .set(".lx-pre__osd", { autoAlpha: 1 }, "<")
        .fromTo(".lx-pre__track", { autoAlpha: 1, yPercent: -100 }, { yPercent: 100, duration: 0.6, ease: "none" }, "<")
        .fromTo(".lx-pre__osd", { x: -14, skewX: 18 }, { x: 0, skewX: 0, duration: 0.4, ease: "power2.out" }, "<")
        .set(".lx-pre__track", { autoAlpha: 0 })
        // 3. Title card.
        .set(".lx-pre__card", { autoAlpha: 1 }, "-=0.12")
        .from(".lx-pre__card .lx-pre__mask > *", { yPercent: 110, duration: 0.5, stagger: 0.05, ease: "expo.out" })
        .add(() => {
          lockScroll(false);
          markIntroDone();
        }, "+=0.3")
        // 4. Screen collapses to a line, the line shrinks away, the site is underneath.
        .to(".lx-pre__screen", { scaleY: 0.004, duration: 0.3, ease: "power3.in" }, "<")
        .set(".lx-pre__line", { autoAlpha: 1, scaleX: 1 })
        .set(".lx-pre__screen", { autoAlpha: 0 })
        .to(".lx-pre__line", { scaleX: 0, duration: 0.22, ease: "power3.in" });
    }, root);

    // Any input fast-forwards; every callback still fires in order.
    const skip = () => tl?.timeScale(7);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    // No markIntroDone here: StrictMode replays this effect and would release the hero early.
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      ctx.revert();
      lockScroll(false);
    };
  }, [visible, reduced]);

  if (!visible || reduced) return null;

  return (
    <div ref={root} className="lx-pre" aria-hidden="true">
      <div className="lx-pre__screen">
        <div className="lx-pre__deck">
          {/* Clip region starts at the slot: the tape vanishes as it slides in. */}
          <div className="lx-pre__feed">
            <div className="lx-pre__tape">
              <span className="lx-pre__label">
                <b>NY-07</b>
                <small>Backend · Security · DevOps</small>
                <em>▶ REC</em>
              </span>
              <span className="lx-pre__window">
                <i />
                <i />
              </span>
            </div>
          </div>
          <div className="lx-pre__vcr">
            <span className="lx-pre__slot" />
            <span className="lx-pre__led">▶ Play</span>
            <span className="lx-pre__count">00:00:07</span>
          </div>
        </div>
        <span className="lx-pre__osd">
          <b>▶ Play</b> CH.01 · Agent NY-07
        </span>
        <i className="lx-pre__track" />
        <div className="lx-pre__card">
          <TitleCard episode={episodes["/"]} maskClass="lx-pre__mask" />
        </div>
        <span className="lx-pre__skip">Press any key to skip</span>
      </div>
      <i className="lx-pre__line" />
    </div>
  );
}
