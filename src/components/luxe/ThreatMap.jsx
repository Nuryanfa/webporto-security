import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";
import { useOverlayMotion } from "../../utils/OverlayMotionContext";

/*
 * Simulated SOC feed. Nothing here is real traffic: source addresses come from
 * the RFC 5737 documentation ranges and the UI labels it as a simulation.
 */

const W = 640;
const H = 400;
const CENTER = { x: 320, y: 200 };
const SHIELD = 74;

const VECTORS = [
  { name: "SSH brute force", port: "tcp/22", action: "Blocked" },
  { name: "SQL injection probe", port: "http/443", action: "Blocked" },
  { name: "Port scan sweep", port: "tcp/*", action: "Dropped" },
  { name: "Credential stuffing", port: "http/443", action: "Rate-limited" },
  { name: "Path traversal", port: "http/80", action: "Blocked" },
  { name: "Request flood", port: "grpc/8443", action: "Rate-limited" },
];
const RANGES = ["192.0.2.", "198.51.100.", "203.0.113."];

const clock = () =>
  new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false });

let serial = 0;
function makeAttack() {
  serial += 1;
  const angle = Math.random() * Math.PI * 2;
  const reach = 420;
  const from = {
    x: Math.max(8, Math.min(W - 8, CENTER.x + Math.cos(angle) * reach)),
    y: Math.max(8, Math.min(H - 8, CENTER.y + Math.sin(angle) * reach * 0.62)),
  };
  const dx = from.x - CENTER.x;
  const dy = from.y - CENTER.y;
  const len = Math.hypot(dx, dy) || 1;
  const to = { x: CENTER.x + (dx / len) * SHIELD, y: CENTER.y + (dy / len) * SHIELD };
  // Bend the arc sideways for a ballistic feel.
  const mid = { x: (from.x + to.x) / 2 - dy * 0.22, y: (from.y + to.y) / 2 + dx * 0.22 - 40 };
  const vector = VECTORS[Math.floor(Math.random() * VECTORS.length)];
  return {
    id: serial,
    d: `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${mid.x.toFixed(1)} ${mid.y.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
    from,
    to,
    vector,
    ip: RANGES[serial % RANGES.length] + (10 + Math.floor(Math.random() * 240)),
    time: clock(),
  };
}

function Attack({ attack, onDone }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const path = ref.current.querySelector("path");
      const length = path.getTotalLength();
      gsap
        .timeline({ onComplete: () => onDone(attack.id) })
        .set(path, { strokeDasharray: length, strokeDashoffset: length })
        .to(path, { strokeDashoffset: 0, duration: 1.05, ease: "power2.in" })
        .fromTo(
          ref.current.querySelector(".lx-threat__hit"),
          { attr: { r: 2 }, opacity: 1 },
          { attr: { r: 30 }, opacity: 0, duration: 0.8, ease: "expo.out" },
        )
        .to(path, { opacity: 0, duration: 0.6 }, "<");
    },
    { scope: ref },
  );
  return (
    <g ref={ref}>
      <circle cx={attack.from.x} cy={attack.from.y} r="2.5" className="lx-threat__origin" />
      <path d={attack.d} className="lx-threat__arc" />
      <circle cx={attack.to.x} cy={attack.to.y} r="2" className="lx-threat__hit" />
    </g>
  );
}

export default function ThreatMap() {
  const root = useRef(null);
  const reduced = useMotionPreference();
  const overlay = useOverlayMotion();
  const [visible, setVisible] = useState(false);
  const [attacks, setAttacks] = useState([]);
  const [log, setLog] = useState(() => Array.from({ length: 6 }, () => makeAttack()));
  const [blocked, setBlocked] = useState(0);

  // Dot lattice shaped like an irregular landmass around the node.
  const dots = useMemo(() => {
    const points = [];
    for (let row = 0; row < 24; row += 1) {
      for (let col = 0; col < 40; col += 1) {
        const x = 12 + col * 16 + (row % 2) * 8;
        const y = 14 + row * 16;
        const nx = (x - CENTER.x) / 300;
        const ny = (y - CENTER.y) / 190;
        const wobble = Math.sin(x * 0.045) * 0.18 + Math.cos(y * 0.06 + x * 0.01) * 0.16;
        if (nx * nx + ny * ny < 0.92 + wobble) points.push([x, y]);
      }
    }
    return points;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible || overlay) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      const attack = makeAttack();
      setAttacks((current) => [...current.slice(-5), attack]);
      setLog((current) => [attack, ...current].slice(0, 7));
    }, 1300);
    return () => clearInterval(id);
  }, [reduced, visible, overlay]);

  const finish = (id) => {
    setAttacks((current) => current.filter((a) => a.id !== id));
    setBlocked((n) => n + 1);
  };

  return (
    <div ref={root} className="lx-threat">
      <div className="lx-threat__map">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Simulated threat map: attacks stopped at the perimeter">
          <g className="lx-threat__dots">
            {dots.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.3" />
            ))}
          </g>
          <circle cx={CENTER.x} cy={CENTER.y} r={SHIELD} className="lx-threat__shield" />
          <circle cx={CENTER.x} cy={CENTER.y} r={SHIELD + 14} className="lx-threat__shield lx-threat__shield--outer" />
          {reduced
            ? log.slice(0, 3).map((a) => <path key={a.id} d={a.d} className="lx-threat__arc is-static" />)
            : attacks.map((attack) => <Attack key={attack.id} attack={attack} onDone={finish} />)}
          <g className="lx-threat__node">
            <polygon points={`${CENTER.x},${CENTER.y - 16} ${CENTER.x + 14},${CENTER.y} ${CENTER.x},${CENTER.y + 16} ${CENTER.x - 14},${CENTER.y}`} />
            <text x={CENTER.x + 24} y={CENTER.y - 6}>NY-07</text>
            <text x={CENTER.x + 24} y={CENTER.y + 9} className="is-dim">
              PERIMETER HOLDING
            </text>
          </g>
        </svg>
        <span className="lx-threat__tag">Simulated feed · not real traffic</span>
      </div>

      <div className="lx-threat__side">
        <div className="lx-threat__stats">
          <div>
            <small>Session · blocked</small>
            <b>{String(blocked).padStart(4, "0")}</b>
          </div>
          <div>
            <small>Perimeter</small>
            <b className="is-go">Holding</b>
          </div>
        </div>
        <ol className="lx-threat__log" aria-label="Simulated event log">
          {log.map((entry) => (
            <li key={entry.id}>
              <span className="lx-threat__time">{entry.time}</span>
              <span className={`lx-threat__act is-${entry.vector.action === "Blocked" ? "red" : "amber"}`}>
                {entry.vector.action}
              </span>
              <span className="lx-threat__what">
                {entry.vector.name}
                <small>
                  {entry.ip} → {entry.vector.port}
                </small>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
