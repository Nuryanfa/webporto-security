import { useEffect, useRef, useState } from "react";
import { playTacticalBlip } from "../utils/audioTelemetry";

/**
 * Wraps children with a tactical lock-on frame.
 * Hover/focus: brackets converge -> "ACQUIRING" -> "LOCKED // <label>".
 * Telemetry text is descriptive only (no fabricated latency numbers).
 */
export default function LockOn({ label = "TARGET", children }) {
  const [phase, setPhase] = useState("idle"); // idle | acquiring | locked
  const timer = useRef(null);

  const start = () => {
    clearTimeout(timer.current);
    setPhase("acquiring");
    timer.current = setTimeout(() => {
      setPhase("locked");
      playTacticalBlip(1320, 0.04);
    }, 260);
  };
  const stop = () => {
    clearTimeout(timer.current);
    setPhase("idle");
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span
      className={`lockon lockon-${phase}`}
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
        {phase === "locked"
          ? `LOCKED // ${label}`
          : phase === "acquiring"
            ? "ACQUIRING..."
            : ""}
      </em>
    </span>
  );
}
