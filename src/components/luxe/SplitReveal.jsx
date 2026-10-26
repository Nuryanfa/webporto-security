import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, onIntroDone } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";

function byDocumentOrder(a, b) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

/**
 * Masked text reveal: pieces slide in on a slant from the left and settle with
 * a small overshoot. Server render and reduced motion show plain text;
 * the split only exists in the browser, so content stays indexable.
 *
 * trigger: "mount" (immediately), "intro" (after the preloader), "scroll".
 * <em> accents stay whole so their gradient fill survives, and slide as one unit.
 */
export default function SplitReveal({
  as: Tag = "div",
  children,
  type = "lines",
  trigger = "scroll",
  delay = 0,
  stagger,
  duration = 0.75,
  start = "top 88%",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useMotionPreference();

  useGSAP(
    (_, contextSafe) => {
      if (reduced || !ref.current) return;
      const el = ref.current;
      const splitType =
        type === "chars" ? "lines,words,chars" : type === "words" ? "lines,words" : "lines";
      // Hide before the split exists so nothing flashes while waiting for the intro.
      gsap.set(el, { autoAlpha: 0 });

      let split;
      const build = contextSafe(() => {
        split = SplitText.create(el, {
          type: splitType,
          mask: "lines",
          autoSplit: true,
          ignore: type === "lines" ? undefined : "em",
          // aria-label is only valid on headings; elsewhere the parent heading names the text.
          aria: /^h[1-6]$/.test(Tag) ? "auto" : "hidden",
          linesClass: "lx-split-line",
          onSplit(self) {
            gsap.set(el, { autoAlpha: 1 });
            const pieces = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
            const accents = type === "lines" ? [] : [...el.querySelectorAll("em")];
            const targets = [...pieces, ...accents].sort(byDocumentOrder);
            const fallbackStagger = type === "chars" ? 0.03 : type === "words" ? 0.06 : 0.09;
            return gsap.from(targets, {
              // Lines are full-width blocks, so they travel a fixed distance instead.
              ...(type === "lines" ? { x: -90 } : { xPercent: type === "chars" ? -70 : -40 }),
              skewX: 16,
              autoAlpha: 0,
              duration,
              delay,
              ease: "back.out(1.6)",
              stagger: stagger ?? fallbackStagger,
              scrollTrigger:
                trigger === "scroll" ? { trigger: el, start, once: true } : undefined,
            });
          },
        });
      });

      // Splitting measures and rewrites the text, forcing style recalcs; doing it for
      // every heading at once blocked phones for ~2s. Scroll headings split only when
      // they come near the viewport ("max" end: any later position still triggers).
      const lazy = () => {
        const near = ScrollTrigger.create({ trigger: el, start: "top bottom+=300", end: "max", once: true, onEnter: build });
        return () => near.kill();
      };
      const cancel =
        trigger === "intro" ? onIntroDone(build) : trigger === "scroll" ? lazy() : (build(), () => {});
      return () => {
        cancel();
        split?.revert();
      };
    },
    { scope: ref, dependencies: [reduced, typeof children === "string" ? children : null] },
  );

  return (
    <Tag ref={ref} className={`lx-split ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
