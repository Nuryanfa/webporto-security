import { useEffect, useRef, useState } from "react";
import { animate, createMotionPath, createScope } from "animejs";
import { motion } from "framer-motion";
import { GitBranch } from "lucide-react";
import { projectScenes } from "../content/projectScenes";
import useReducedMotion from "../utils/useMotionPreference";

export default function OperationMap({ code }) {
  const stages = projectScenes[code] || [];
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const root = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced || !root.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [reduced]);

  useEffect(() => {
    if (!visible || reduced || !root.current) return;
    const path = root.current.querySelector(".lx-flow__path");
    const length = path.getTotalLength();
    path.style.strokeDasharray = String(length);
    path.style.strokeDashoffset = String(length);
    const packets = [...root.current.querySelectorAll(".lx-flow__packet")];
    const scope = createScope({ root: root.current }).add(() => {
      animate(path, { strokeDashoffset: [length, 0], duration: 1100, ease: "out(3)" });
    });
    const loops = packets.map((packet, index) =>
      animate(packet, {
        ...createMotionPath(path),
        opacity: [0, 1, 1, 0],
        duration: 5200,
        delay: index * 2600 + 1000,
        loop: true,
        ease: "inOut(2)",
      }),
    );
    let inViewport = true;
    const sync = () => {
      const paused =
        !inViewport || document.hidden || !!document.querySelector('[data-ui-overlay="active"]');
      loops.forEach((animation) => (paused ? animation.pause() : animation.resume()));
    };
    const visibility = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting;
      sync();
    });
    visibility.observe(root.current);
    const overlay = new MutationObserver(sync);
    const shell = document.querySelector(".cyber-shell");
    if (shell) overlay.observe(shell, { attributes: true, attributeFilter: ["data-ui-overlay"] });
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      document.removeEventListener("visibilitychange", sync);
      overlay.disconnect();
      visibility.disconnect();
      loops.forEach((animation) => animation.cancel());
      scope.revert();
      path.style.removeProperty("stroke-dasharray");
      path.style.removeProperty("stroke-dashoffset");
    };
  }, [visible, reduced]);

  if (!stages.length) return null;
  const current = stages[selected];

  return (
    <section ref={root} className="lx-flow" aria-label={`${code} architecture stages`}>
      <div className="lx-flow__head">
        <span className="lx-eyebrow">Architecture — 3 stages</span>
        <span className="lx-flow__hint">Select a stage</span>
      </div>

      <div className="lx-flow__rail">
        <svg className="lx-flow__svg" viewBox="0 0 600 24" preserveAspectRatio="none" aria-hidden="true">
          <path className="lx-flow__path" d="M 4 12 H 596" fill="none" />
          {!reduced && (
            <>
              <circle className="lx-flow__packet" r="3.2" opacity="0" />
              <circle className="lx-flow__packet lx-flow__packet--b" r="2.6" opacity="0" />
            </>
          )}
        </svg>
        <div className="lx-flow__stages" role="group" aria-label="Inspect a stage">
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={selected === index ? "is-active" : ""}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {selected === index && (
                <motion.span
                  layoutId={`lx-flow-${code}`}
                  className="lx-flow__glow"
                  transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="lx-flow__node" aria-hidden="true" />
              <small>Stage 0{index + 1}</small>
              <b>{stage.title}</b>
            </button>
          ))}
        </div>
      </div>

      <div className="lx-flow__detail" aria-live="polite">
        <p key={`detail-${selected}`}>{current.detail}</p>
        {current.tradeoff && (
          <div className="lx-flow__adr" key={`adr-${selected}`}>
            <span>
              <GitBranch size={13} /> Decision &amp; trade-off · ADR-0{selected + 1}
            </span>
            <p>{current.tradeoff}</p>
          </div>
        )}
      </div>

      <p className="lx-flow__note">
        {code === "X509"
          ? "Architecture proposal centred on zero-trust cryptography boundaries and auditable state verification."
          : "Concept map of the repository's intended architecture; see the source for what is implemented today."}
      </p>
    </section>
  );
}
