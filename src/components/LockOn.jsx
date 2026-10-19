import { useEffect, useRef, useState } from "react";
import { animate, createScope } from "animejs";
import { playTacticalBlip } from "../utils/audioTelemetry";
import useMotionPreference from "../utils/useMotionPreference";

/**
 * Wraps children with a tactical lock-on frame.
 * Hover/focus: brackets converge -> "ACQUIRING" -> "LOCKED // <label>".
 * Telemetry text is descriptive only (no fabricated latency numbers).
 */
export default function LockOn({ label = "TARGET", children, isLocked = false }) {
  const [phase, setPhase] = useState("idle"); // idle | acquiring | locked
  const timer = useRef(null);
  const root = useRef(null);
  const reduced = useMotionPreference();
  const active = isLocked || phase !== "idle";

  const start = () => {
    if (isLocked || phase !== "idle") return;
    clearTimeout(timer.current);
    setPhase(reduced ? "locked" : "acquiring");
    if (reduced) return;
    timer.current = setTimeout(() => {
      setPhase("locked");
      playTacticalBlip(1320, 0.04);
    }, 420);
  };
  const stop = () => {
    if (isLocked) return;
    clearTimeout(timer.current);
    setPhase("idle");
  };
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!active || reduced || !root.current) return;
    const scope = createScope({ root: root.current }).add(() => {
      const offsets = [[-10, -10], [10, -10], [-10, 10], [10, 10]];
      root.current.querySelectorAll(".lockon-c").forEach((corner, index) => {
        animate(corner, {
          opacity: [0, 1],
          scale: [1.3, 1],
          translateX: [offsets[index][0], 0],
          translateY: [offsets[index][1], 0],
          duration: 300,
          delay: index * 80,
          ease: "out(4)",
        });
      });
      animate(".lockon-tag", {
        opacity: [0, 1, 0.45, 1],
        translateX: [-10, 0],
        duration: 360,
        delay: 300,
        ease: "out(3)",
      });
    });
    return () => scope.revert();
  }, [active, reduced]);

  return (
    <span
      ref={root}
      className={`lockon lockon-${isLocked ? "locked" : phase}`}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <i className="lockon-c lockon-tl" aria-hidden="true" />
      <i className="lockon-c lockon-tr" aria-hidden="true" />
      <i className="lockon-c lockon-bl" aria-hidden="true" />
      <i className="lockon-c lockon-br" aria-hidden="true" />
      {children}
      <em className="lockon-tag" aria-hidden="true">
        {isLocked || phase === "locked"
          ? `LOCKED // ${label}`
          : phase === "acquiring"
            ? "ACQUIRING..."
            : ""}
      </em>
    </span>
  );
}
