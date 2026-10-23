import { useLayoutEffect, useRef, useState } from "react";
import { gsap, markIntroDone } from "../../luxe/gsap";
import { lockScroll } from "../../luxe/lenis";
import useMotionPreference from "../../utils/useMotionPreference";
import TitleCard from "./TitleCard";
import { episodes } from "../../content/episodes";

const SEEN_KEY = "lx-intro-seen";

const BOOT = [
  ["TRIAD DEFENSE SYSTEM", "BOOT"],
  ["loading kernel modules", "OK"],
  ["applying firewall ruleset", "OK"],
  ["starting intrusion detection", "OK"],
  ["verifying operator identity", "OK"],
];

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * First visit per session: terminal boot → ACCESS GRANTED → title card → open.
 * About 2s; any key, click or tap fast-forwards it.
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
      tl.from(".lx-pre__line", { autoAlpha: 0, duration: 0.01, stagger: 0.09 })
        .from(".lx-pre__ok", { autoAlpha: 0, duration: 0.01, stagger: 0.09 }, 0.06)
        .fromTo(".lx-pre__bar i", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "steps(10)" }, 0)
        .set(".lx-pre__term", { autoAlpha: 0 }, "+=0.08")
        .set(".lx-pre__granted", { autoAlpha: 1 })
        .fromTo(".lx-pre__granted", { scaleY: 0.02 }, { scaleY: 1, duration: 0.16, ease: "power4.out" })
        .from(".lx-pre__pattern", { autoAlpha: 0, duration: 0.01 }, "+=0.08")
        .to(".lx-pre__granted", { autoAlpha: 0, duration: 0.04, repeat: 3, yoyo: true }, "+=0.32")
        .set(".lx-pre__granted", { autoAlpha: 0 })
        .set(".lx-pre__card", { autoAlpha: 1 })
        .from(".lx-pre__card .lx-pre__mask > *", { yPercent: 110, duration: 0.5, stagger: 0.05, ease: "expo.out" })
        .add(() => {
          lockScroll(false);
          markIntroDone();
        }, "+=0.2")
        .to(".lx-pre__card", { autoAlpha: 0, duration: 0.25 }, "<")
        .to(".lx-pre__panel", { yPercent: (i) => (i ? 100 : -100), duration: 0.8, ease: "expo.inOut" }, "<");
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
      <div className="lx-pre__panel" />
      <div className="lx-pre__panel" />
      <div className="lx-pre__term">
        {BOOT.map(([text, status]) => (
          <div className="lx-pre__row" key={text}>
            <span className="lx-pre__line">&gt; {text}</span>
            <span className="lx-pre__ok">[ {status} ]</span>
          </div>
        ))}
        <div className="lx-pre__bar">
          <i />
        </div>
      </div>
      <div className="lx-pre__granted">
        <span lang="ja">認証完了</span>
        <b>Access granted</b>
        <small className="lx-pre__pattern">Pattern: orange — operator confirmed</small>
      </div>
      <div className="lx-pre__card">
        <TitleCard episode={episodes["/"]} maskClass="lx-pre__mask" />
      </div>
      <span className="lx-pre__skip">Press any key to skip</span>
    </div>
  );
}
