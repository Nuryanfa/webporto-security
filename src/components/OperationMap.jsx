import { useRef } from "react";
import { gsap, useGSAP } from "../luxe/gsap";
import { projectScenes } from "../content/projectScenes";
import useReducedMotion from "../utils/useMotionPreference";

/**
 * Architecture as a readable sequence: every stage, its job and the trade-off
 * behind it are visible at once. The connecting line draws in when it scrolls
 * into view; nothing needs to be clicked to read the content.
 */
export default function OperationMap({ code }) {
  const stages = projectScenes[code] || [];
  const root = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const trigger = { trigger: root.current, start: "top 80%", once: true };
      gsap.from(".lx-steps__line", { scaleY: 0, duration: 1.2, ease: "power3.inOut", scrollTrigger: trigger });
      gsap.from(".lx-step", {
        x: -14,
        autoAlpha: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: trigger,
      });
    },
    { scope: root, dependencies: [reduced, code] },
  );

  if (!stages.length) return null;

  return (
    <section ref={root} className="lx-flow" aria-label={`${code} architecture`}>
      <div className="lx-flow__head">
        <span className="lx-eyebrow">Architecture</span>
        <span className="lx-flow__hint">Request path · {stages.length} stages</span>
      </div>

      <div className="lx-steps">
        <i className="lx-steps__line" aria-hidden="true" />
        <ol>
          {stages.map((stage, index) => (
            <li key={stage.title} className="lx-step">
              <span className="lx-step__num" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="lx-step__body">
                <h4>{stage.title}</h4>
                <p>{stage.detail}</p>
                {stage.tradeoff && (
                  <p className="lx-step__adr">
                    <b>Trade-off</b>
                    {stage.tradeoff}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <p className="lx-flow__note">
        {code === "X509"
          ? "Architecture proposal centred on zero-trust cryptography boundaries and auditable state verification."
          : "Concept map of the repository's intended architecture; see the source for what is implemented today."}
      </p>
    </section>
  );
}
