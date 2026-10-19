import { useLayoutEffect, useRef, useState } from "react";
import { gsap, markIntroDone } from "../../luxe/gsap";
import { lockScroll } from "../../luxe/lenis";
import useMotionPreference from "../../utils/useMotionPreference";

const SEEN_KEY = "lx-intro-seen";

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

// First visit per session: a short counter and curtain, then the hero takes over.
export default function Preloader() {
  const reduced = useMotionPreference();
  const [visible, setVisible] = useState(() => !alreadySeen());
  const root = useRef(null);
  const count = useRef(null);

  useLayoutEffect(() => {
    if (!visible || reduced) {
      markIntroDone();
      if (visible) setVisible(false);
      return;
    }
    lockScroll(true);
    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
          setVisible(false);
        },
      });
      tl.from(".lx-pre__line > span", {
        yPercent: 110,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
      })
        .to(
          counter,
          {
            value: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
            },
          },
          0.1,
        )
        .fromTo(".lx-pre__bar i", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0.1)
        .to(".lx-pre__inner", { yPercent: -30, autoAlpha: 0, duration: 0.7, ease: "power3.in" }, "+=0.1")
        .add(() => {
          lockScroll(false);
          markIntroDone();
        }, "-=0.15")
        .to(
          ".lx-pre__panel",
          { yPercent: -100, duration: 1.05, ease: "expo.inOut", stagger: 0.07 },
          "-=0.35",
        );
    }, root);
    // No markIntroDone here: StrictMode replays this effect and would release the hero early.
    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, [visible, reduced]);

  if (!visible || reduced) return null;

  return (
    <div ref={root} className="lx-pre" aria-hidden="true">
      <div className="lx-pre__panel" />
      <div className="lx-pre__panel" />
      <div className="lx-pre__inner">
        <div className="lx-pre__top">
          <span>NY—07</span>
          <span>Portfolio ©2026</span>
        </div>
        <div className="lx-pre__title">
          <div className="lx-pre__line">
            <span>Built to endure.</span>
          </div>
          <div className="lx-pre__line">
            <span>
              <em>Secure by design.</em>
            </span>
          </div>
        </div>
        <div className="lx-pre__bottom">
          <div className="lx-pre__bar">
            <i />
          </div>
          <span ref={count} className="lx-pre__count">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
