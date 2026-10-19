import { useEffect, useState } from "react";
import { onIntroDone } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";
import { capabilities } from "../../content/capabilities";

const LABELS = {
  idle: ["待機", "Standby"],
  busy: ["審議中", "Deliberating"],
  ok: ["可決", "Approved"],
};

/**
 * Three decision cores (Backend / Security / DevOps) that deliberate and vote.
 * Purely decorative state; the content it frames comes from capabilities.js.
 */
export default function TriadPanel({ className = "" }) {
  const reduced = useMotionPreference();
  const [states, setStates] = useState(["idle", "idle", "idle"]);

  useEffect(() => {
    if (reduced) {
      setStates(["ok", "ok", "ok"]);
      return;
    }
    const timers = [];
    let loop = 0;
    const setAt = (index, value) =>
      setStates((current) => current.map((state, i) => (i === index ? value : state)));

    const cancel = onIntroDone(() => {
      capabilities.forEach((_, i) => {
        timers.push(setTimeout(() => setAt(i, "busy"), 500 + i * 220));
        timers.push(setTimeout(() => setAt(i, "ok"), 1500 + i * 520));
      });
      // Every so often one core re-evaluates, so the panel never feels frozen.
      loop = setInterval(() => {
        if (document.hidden) return;
        const i = Math.floor(Math.random() * capabilities.length);
        setAt(i, "busy");
        timers.push(setTimeout(() => setAt(i, "ok"), 1300));
      }, 6500);
    });
    return () => {
      cancel();
      clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const approved = states.filter((s) => s === "ok").length;

  return (
    <div className={`lx-triad ${className}`} role="group" aria-label="Triad system: backend, security and DevOps">
      <div className="lx-triad__head">
        <span>Triad system</span>
        <span lang="ja">三位一体</span>
      </div>
      <div className="lx-triad__cores">
        {capabilities.map((core, i) => {
          const [ja, en] = LABELS[states[i]];
          return (
            <div key={core.id} className={`lx-triad__core is-${states[i]}`} style={{ "--c": core.color }}>
              <small>Core · 0{i + 1}</small>
              <span className="lx-triad__kanji" lang="ja">
                {core.kanji}
              </span>
              <b>{core.verb}</b>
              <em>
                <span lang="ja">{ja}</span> {en}
              </em>
            </div>
          );
        })}
      </div>
      <div className={`lx-triad__verdict ${approved === 3 ? "is-go" : ""}`}>
        <span>Consensus {approved}/3</span>
        <span>{approved === 3 ? "Deploy authorized" : "Deliberating…"}</span>
      </div>
    </div>
  );
}
