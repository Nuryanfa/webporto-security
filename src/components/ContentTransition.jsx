import { useRef } from "react";
import { gsap, useGSAP } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";

/**
 * Swaps panel content by key; the incoming panel staggers its [data-stagger]
 * children in. The first render is left to the page entrance choreography.
 */
export default function ContentTransition({ id, children, className = "" }) {
  const frame = useRef(null);
  const first = useRef(true);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (reduced || !frame.current) return;
      gsap.from(gsap.utils.toArray("[data-stagger]", frame.current), {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.05,
      });
    },
    { dependencies: [id, reduced] },
  );

  return (
    <div className={`content-transition ${className}`}>
      <div key={id} ref={frame} className="content-frame">
        {children}
      </div>
    </div>
  );
}
