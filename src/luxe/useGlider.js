import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "./gsap";
import useMotionPreference from "../utils/useMotionPreference";

// Layout effect in the browser, plain effect during SSR (avoids React warnings).
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Slides one highlight element (.lx-glider, a direct child of the container)
 * onto whichever child matches `selector` (replaces Framer's layoutId).
 * The container must be position: relative.
 */
export default function useGlider(containerRef, selector, deps = []) {
  const reduced = useMotionPreference();
  const first = useRef(true);

  useIsoLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const glider = root.querySelector(":scope > .lx-glider");
    if (!glider) return;

    const place = (instant) => {
      const target = root.querySelector(`:scope > ${selector}`);
      if (!target) {
        gsap.set(glider, { autoAlpha: 0 });
        return;
      }
      const props = {
        x: target.offsetLeft,
        y: target.offsetTop,
        width: target.offsetWidth,
        height: target.offsetHeight,
        autoAlpha: 1,
      };
      if (instant || reduced) gsap.set(glider, props);
      else gsap.to(glider, { ...props, duration: 0.6, ease: "expo.out", overwrite: true });
    };

    place(first.current);
    first.current = false;
    const resize = new ResizeObserver(() => place(true));
    resize.observe(root);
    document.fonts?.ready.then(() => place(true));
    return () => resize.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, selector, ...deps]);
}
