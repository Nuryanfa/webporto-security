import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, onStageReady } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";

/**
 * Page wrapper that owns scroll choreography for its subtree:
 * - [data-reveal]       fades and rises in batches as it enters the viewport
 * - [data-parallax="n"] drifts by n% of its height while scrolling past
 * - [data-clip]         unmasks upward (images and media)
 * - [data-count="n"]    counts up to n once visible (server render shows n)
 */
export default function AnimatedPage({ children, className = "" }) {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      const reveal = gsap.utils.toArray("[data-reveal]", root.current);
      // Hide now, but only start revealing once the curtain/preloader is out of the way.
      if (reveal.length) gsap.set(reveal, { autoAlpha: 0, y: 48 });
      const cancelStage = onStageReady(
        contextSafe(() => {
          if (!reveal.length) return;
          ScrollTrigger.batch(reveal, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.09,
              overwrite: true,
            }),
          });
        }),
      );

      gsap.utils.toArray("[data-parallax]", root.current).forEach((el) => {
        const amount = Number(el.dataset.parallax) || 12;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      gsap.utils.toArray("[data-count]", root.current).forEach((el) => {
        const target = Number(el.dataset.count);
        const value = { n: 0 };
        el.textContent = "00";
        gsap.to(value, {
          n: target,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(value.n)).padStart(2, "0");
          },
        });
      });

      gsap.utils.toArray("[data-clip]", root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });
      return cancelStage;
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className={`animated-page ${className}`}>
      {children}
    </div>
  );
}
