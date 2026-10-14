import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";

// A high-end decorative tactical cursor follower. Native cursor remains fully functional.
export default function CyberCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 460, damping: 36, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 460, damping: 36, mass: 0.4 });

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
            'a, button:not(:disabled), summary, [role="tab"], input, select',
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

  if (reduced) return null;

  return (
    <>
      {/* Center Laser Point */}
      <motion.div
        aria-hidden="true"
        className="pointer-dot"
        style={{ x, y }}
        animate={{
          opacity: visible ? 0.95 : 0,
          scale: pressed ? 1.6 : active ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Tactical Outer Follower Reticle */}
      <motion.div
        aria-hidden="true"
        className="pointer-follower relative flex items-center justify-center"
        style={{ x: sx, y: sy }}
        animate={{
          opacity: visible ? (active ? 0.9 : 0.6) : 0,
          scale: pressed ? 0.75 : active ? 1.55 : 1,
          rotate: active ? 45 : 0,
          borderRadius: active ? "22%" : "50%",
          borderColor: active ? "#00f3ff" : "rgba(137, 201, 197, 0.5)",
          boxShadow: active ? "0 0 14px rgba(0, 243, 255, 0.4)" : "none",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      >
        {active && (
          <span className="text-[9px] text-resonance font-mono pointer-events-none select-none">
            +
          </span>
        )}
      </motion.div>
    </>
  );
}
