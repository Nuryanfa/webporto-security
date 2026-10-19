import { useLayoutEffect, useRef, useState } from "react";
import { gsap, markIntroDone } from "../../luxe/gsap";
import { lockScroll } from "../../luxe/lenis";
import useMotionPreference from "../../utils/useMotionPreference";

const SEEN_KEY = "lx-intro-seen";

const BOOT = [
  ["TRIAD DEFENSE SYSTEM", "BOOT"],
  ["loading kernel modules", "OK"],
  ["mounting /srv/backend", "OK"],
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

// First visit per session: terminal boot → ACCESS GRANTED → title card → open.
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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(SEEN_KEY, "1");
          } catch {}
          setVisible(false);
        },
      });
      // Lines print in quick bursts, the way a real boot log arrives.
      tl.from(".lx-pre__line", { autoAlpha: 0, duration: 0.01, stagger: 0.13 })
        .from(".lx-pre__ok", { autoAlpha: 0, duration: 0.01, stagger: 0.13 }, 0.1)
        .fromTo(".lx-pre__bar i", { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: "steps(12)" }, 0)
        .set(".lx-pre__term", { autoAlpha: 0 }, "+=0.12")
        .set(".lx-pre__granted", { autoAlpha: 1 })
        .fromTo(".lx-pre__granted", { scaleY: 0.02 }, { scaleY: 1, duration: 0.18, ease: "power4.out" })
        .to(".lx-pre__granted", { autoAlpha: 0, duration: 0.05, repeat: 3, yoyo: true }, "+=0.22")
        .set(".lx-pre__granted", { autoAlpha: 0 })
        .set(".lx-pre__card", { autoAlpha: 1 })
        .from(".lx-pre__card > *", { autoAlpha: 0, duration: 0.01, stagger: 0.09 })
        .add(() => {
          lockScroll(false);
          markIntroDone();
        }, "+=0.45")
        .to(".lx-pre__panel", { yPercent: (i) => (i ? 100 : -100), duration: 0.85, ease: "expo.inOut" }, "<")
        .to(".lx-pre__card", { autoAlpha: 0, duration: 0.2 }, "<");
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
      </div>
      <div className="lx-pre__card">
        <span className="lx-title-card__ep">Episode 01</span>
        <span className="lx-title-card__kanji" lang="ja">
          起動
        </span>
        <span className="lx-title-card__en">System Online</span>
      </div>
    </div>
  );
}
