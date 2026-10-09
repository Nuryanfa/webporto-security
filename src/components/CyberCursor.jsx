import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";

// A decorative follower. Native cursor remains available even if JS fails.
export default function CyberCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.45 });
  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hide = () => {
      setVisible(false);
      setPressed(false);
    };
    const move = (event) => {
      if (reduced || !media.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(
        Boolean(
          event.target.closest(
            'a, button:not(:disabled), summary, [role="tab"]',
          ),
        ),
      );
    };
    const down = (event) => {
      if (event.pointerType === "mouse") setPressed(true);
    };
    const up = () => setPressed(false);
    const visibility = () => {
      if (document.hidden) hide();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", hide);
    return () => {
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", hide);
    };
  }, [reduced, x, y]);
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-follower"
      style={{ x: sx, y: sy }}
      animate={{
        opacity: visible && !reduced ? 0.65 : 0,
        scale: pressed ? 0.75 : active ? 1.4 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
