import { useEffect, useRef, useState } from "react";
import { GitBranch } from "lucide-react";
import { gsap } from "../luxe/gsap";
import useGlider from "../luxe/useGlider";
import { projectScenes } from "../content/projectScenes";
import useReducedMotion from "../utils/useMotionPreference";

export default function OperationMap({ code }) {
  const stages = projectScenes[code] || [];
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const root = useRef(null);
  const stageRow = useRef(null);
  useGlider(stageRow, '[aria-pressed="true"]', [selected, code]);

  // Draw the path once in view, then send two packets along it while visible.
  useEffect(() => {
    if (reduced || !root.current) return;
    const el = root.current;
    const path = el.querySelector(".lx-flow__path");
    const packets = [...el.querySelectorAll(".lx-flow__packet")];
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: `${length} ${length}`, strokeDashoffset: length });

    const loops = packets.map((packet, index) => {
      const progress = { t: 0 };
      return gsap.to(progress, {
        t: 1,
        duration: 4.6,
        ease: "sine.inOut",
        repeat: -1,
        delay: index * 2.3,
        paused: true,
        onUpdate: () => {
          const point = path.getPointAtLength(progress.t * length);
          packet.setAttribute("cx", point.x);
          packet.setAttribute("cy", point.y);
          packet.setAttribute("opacity", Math.sin(progress.t * Math.PI).toFixed(2));
        },
      });
    });

    let drawn = false;
    let inView = false;
    const sync = () => {
      const paused = !inView || document.hidden || !!document.querySelector('[data-ui-overlay="active"]');
      loops.forEach((loop) => (paused ? loop.pause() : loop.resume()));
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && !drawn) {
          drawn = true;
          gsap.to(path, { strokeDashoffset: 0, duration: 1.1, ease: "power3.out" });
        }
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      loops.forEach((loop) => loop.kill());
      gsap.killTweensOf(path);
      gsap.set(path, { clearProps: "strokeDasharray,strokeDashoffset" });
    };
  }, [reduced, code]);

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
        <div ref={stageRow} className="lx-flow__stages" role="group" aria-label="Inspect a stage">
          <span className="lx-glider lx-flow__glow" aria-hidden="true" />
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={selected === index ? "is-active" : ""}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
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
