import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, onStageReady } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";

/**
 * Page wrapper that owns scroll choreography for its subtree:
 * - [data-reveal]       slides in on a slant, in batches, as it enters the viewport
 *                       (data-reveal="right" enters from the right instead)
 * - [data-parallax="n"] drifts by n% of its height while scrolling past
 * - [data-clip]         unmasks from the left (images and media)
 * - [data-count="n"]    counts up to n once visible (server render shows n)
 * - [data-redact]       starts behind a redaction bar that pulls away once visible
 */
export default function AnimatedPage({ children, className = "" }) {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      const reveal = gsap.utils.toArray("[data-reveal]", root.current);
      // Hide now, but only start revealing once the curtain/preloader is out of the way.
      const fromRight = (el) => el.dataset.reveal === "right";
      if (reveal.length) {
        gsap.set(reveal, {
          autoAlpha: 0,
          x: (_, el) => (fromRight(el) ? 40 : -40),
          skewX: (_, el) => (fromRight(el) ? -5 : 5),
        });
      }
      const cancelStage = onStageReady(
        contextSafe(() => {
          if (!reveal.length) return;
          ScrollTrigger.batch(reveal, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              x: 0,
              skewX: 0,
              duration: 0.7,
              ease: "back.out(1.4)",
              stagger: 0.08,
              overwrite: true,
              // Hand transforms back to CSS so hover states keep working.
              clearProps: "transform",
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

      // Bars cover the text until stage-ready, then declassify one by one in view.
      const redacted = gsap.utils.toArray("[data-redact]", root.current);
      if (redacted.length) gsap.set(redacted, { "--redact": 1 });
      const cancelRedact = onStageReady(
        contextSafe(() => {
          redacted.forEach((el, i) => {
            gsap.to(el, {
              "--redact": 0,
              duration: 0.55,
              delay: (i % 4) * 0.12,
              ease: "steps(6)",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          });
        }),
      );

      gsap.utils.toArray("[data-clip]", root.current).forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          },
        );
      });
      return () => {
        cancelStage();
        cancelRedact();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <div ref={root} className={`animated-page ${className}`}>
      {children}
    </div>
  );
}
