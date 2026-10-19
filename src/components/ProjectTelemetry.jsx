import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import useMotionPreference from "../utils/useMotionPreference";

/** A single short signal burst; no idle loop or React frame updates. */
export default function ProjectTelemetry({ code }) {
  const root = useRef(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    if (reduced || !root.current) return;
    const host = root.current.closest("article") || root.current.parentElement;
    let animation;
    const burst = () => {
      animation?.cancel();
      animation = animate(root.current.querySelectorAll(".telemetry-bar"), {
        scaleY: [0.4, 1.5, 0.75, 1],
        delay: stagger(65),
        duration: 650,
        ease: "out(3)",
      });
    };
    host.addEventListener("pointerenter", burst);
    host.addEventListener("focusin", burst);
    return () => {
      animation?.cancel();
      host.removeEventListener("pointerenter", burst);
      host.removeEventListener("focusin", burst);
    };
  }, [reduced]);

  return (
    <div ref={root} className="project-telemetry" aria-hidden="true">
      <span>SYS // {code}</span>
      <span className="telemetry-bars">
        {[5, 10, 7, 13].map((height, index) =>
          <i className="telemetry-bar" key={index} style={{ height }} />)}
      </span>
      <span className="telemetry-online">● ONLINE</span>
    </div>
  );
}
