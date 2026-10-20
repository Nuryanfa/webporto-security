import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useMotionPreference from "../utils/useMotionPreference";

// Layout effect in the browser, plain effect during SSR (avoids React warnings).
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Mount/unmount with GSAP enter and exit animations (replaces AnimatePresence).
 * enter(el) and exit(el) return a GSAP tween or timeline. The element stays
 * mounted until the exit animation completes.
 */
export default function usePresence(open, { enter, exit }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(open);
  const reduced = useMotionPreference();

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      if (reduced) return;
      const animation = enter(el);
      return () => animation?.kill();
    }
    if (reduced) {
      setMounted(false);
      return;
    }
    const animation = exit(el);
    if (!animation) {
      setMounted(false);
      return;
    }
    animation.eventCallback("onComplete", () => setMounted(false));
    return () => animation.kill();
    // enter/exit are recreated each render; the animation only depends on state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mounted, reduced]);

  return [mounted, ref];
}
