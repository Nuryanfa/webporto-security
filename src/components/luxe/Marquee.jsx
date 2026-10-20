import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";

/**
 * Infinite ticker whose speed and direction respond to scroll velocity.
 * Content is rendered twice; the track loops at -50%.
 */
export default function Marquee({ items, reverse = false, speed = 38, className = "" }) {
  const root = useRef(null);
  const reduced = useMotionPreference();

  useGSAP(
    () => {
      if (reduced) return;
      const track = root.current.querySelector(".lx-marquee__track");
      const loop = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: speed, ease: "none", repeat: -1 },
      );
      let boost = 0;
      const decay = gsap.ticker.add(() => {
        boost *= 0.92;
        loop.timeScale(1 + boost);
      });
      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          boost = gsap.utils.clamp(-0.8, 6, Math.abs(self.getVelocity()) / 350);
          gsap.to(track, {
            skewX: gsap.utils.clamp(-6, 6, self.getVelocity() / -320),
            duration: 0.4,
            overwrite: true,
          });
        },
        onLeave: () => loop.pause(),
        onEnterBack: () => loop.resume(),
        onLeaveBack: () => loop.pause(),
        onEnter: () => loop.resume(),
      });
      return () => {
        gsap.ticker.remove(decay);
        trigger.kill();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  const row = items.map((item, i) => (
    <span className="lx-marquee__item" key={`${item}-${i}`}>
      {item}
      <i aria-hidden="true">✦</i>
    </span>
  ));

  return (
    <div ref={root} className={`lx-marquee ${className}`} aria-label={items.join(", ")} role="marquee">
      <div className="lx-marquee__track" aria-hidden="true">
        <div className="lx-marquee__row">{row}</div>
        <div className="lx-marquee__row">{row}</div>
      </div>
    </div>
  );
}
