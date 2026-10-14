import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useReducedMotion from "../utils/useMotionPreference";

const nodeTelemetry = [
  "IDENTITY // ARCH",
  "OPERATIONS // 07",
  "TIMELINE // TRACE",
  "CHANNELS // LIVE",
];

export default function NexusScene({ nodes, selected, onSelect }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 24 });
  const sy = useSpring(y, { stiffness: 90, damping: 24 });

  useEffect(() => {
    if (reduced) return;
    const scope = createScope({ root: root.current }).add(() => {
      animate(".map-entrance", {
        opacity: [0, 1],
        delay: stagger(75),
        duration: 800,
        ease: "out(4)",
      });
      animate(".map-route-base", {
        strokeDashoffset: [1, 0],
        duration: 1200,
        ease: "inOut(3)",
      });
    });
    return () => scope.revert();
  }, [reduced]);

  const move = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const paths = [
    "M500 240H380L320 140H195",
    "M500 240H620L680 140H805",
    "M500 240H380L320 340H195",
    "M500 240H620L680 340H805",
  ];

  return (
    <div
      ref={root}
      className="nexus-map"
      onPointerMove={move}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="map-grid" />
      <div className="map-halo" />
      
      {/* Tactical HUD Header Telemetry */}
      <span className="map-coordinate coordinate-nw">
        01—04 / SYSTEM_MATRIX
      </span>
      <span className="map-coordinate coordinate-ne flex items-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
        GRID: ONLINE [DEFENSE_ENGAGED]
      </span>

      {/* Circuit Routes & Data Packets */}
      <svg
        className="map-routes"
        viewBox="0 0 1000 480"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {paths.map((d, i) => (
          <g key={d}>
            <path
              className="map-route-base"
              d={d}
              pathLength="1"
              strokeDasharray="1"
            />
            {/* Active Route Highlight Line */}
            <motion.path
              d={d}
              fill="none"
              stroke="#00f3ff"
              strokeWidth={selected === i ? "1.5" : "1"}
              initial={false}
              animate={{
                pathLength: selected === i ? 1 : 0.15,
                opacity: selected === i ? 0.9 : 0.25,
              }}
              transition={{
                duration: reduced ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            {/* High-Energy Glowing Data Packet for Selected Route (Continuous Loop) */}
            {selected === i && !reduced && (
              <motion.path
                key={`packet-active-${selected}`}
                d={d}
                pathLength="1"
                fill="none"
                stroke="#00f3ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="0.05 0.95"
                initial={{ strokeDashoffset: 0.05, opacity: 0 }}
                animate={{
                  strokeDashoffset: [0.05, -1],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.6,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.4,
                }}
                style={{ filter: "drop-shadow(0 0 8px #00f3ff)" }}
              />
            )}
            {/* Ambient Low-Energy Data Pulse on Idle Routes */}
            {selected !== i && !reduced && (
              <motion.path
                key={`packet-ambient-${i}`}
                d={d}
                pathLength="1"
                fill="none"
                stroke="rgba(155, 202, 196, 0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="0.035 0.965"
                animate={{
                  strokeDashoffset: [0.035, -1],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 3.8 + i * 0.7,
                  ease: "linear",
                  repeat: Infinity,
                  delay: i * 0.9,
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* Central Cyber-Ronin Holographic Core */}
      <motion.div
        className="map-parallax"
        style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      >
        <div className="map-core map-entrance">
          {/* Reaction pulse ring on node selection */}
          {!reduced && (
            <motion.span
              key={`ring-${selected}`}
              className="core-response-ring"
              aria-hidden="true"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1.35, opacity: [0, 0.55, 0] }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          )}

          <div className="map-core-caption flex items-center justify-center gap-2">
            <span className="inline-block w-1 h-1 rounded-full bg-resonance animate-ping" />
            <span>BUILD · DEFEND · OPERATE</span>
          </div>

          {/* Holographic Instrument Rings with Counter-Rotations */}
          <svg
            viewBox="0 0 300 300"
            className="core-instrument"
            aria-hidden="true"
          >
            {/* Outer Static Track */}
            <circle cx="150" cy="150" r="146" />
            
            {/* Counter-rotating degree tick marks */}
            <circle
              className="instrument-ticks spin-slow-reverse"
              cx="150"
              cy="150"
              r="134"
            />
            
            {/* Outer scanning radar arc */}
            <circle
              className="instrument-arc spin-slow"
              cx="150"
              cy="150"
              r="122"
            />

            {/* Inner tactical crosshairs */}
            <g opacity="0.35" stroke="#79e6df" strokeWidth="0.8">
              <line x1="150" y1="8" x2="150" y2="24" />
              <line x1="150" y1="276" x2="150" y2="292" />
              <line x1="8" y1="150" x2="24" y2="150" />
              <line x1="276" y1="150" x2="292" y2="150" />
            </g>
          </svg>

          {/* Portrait with Glowing Cyber Ronin Rim */}
          <div className="core-portrait group">
            <img
              src="/profile.webp"
              alt="Muhamad Nur Yanfa"
              fetchpriority="high"
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-tactical-black/40 via-transparent to-transparent" />
          </div>

          {/* Tactical Monogram Badge */}
          <div className="core-nameplate">
            <span>NY—07</span>
            <i className="animate-pulse" />
            BACKEND / DEVSECOPS
          </div>
        </div>
      </motion.div>

      {/* Interactive 4 Node Buttons */}
      {nodes.map(({ id, label, detail, icon: Icon }, index) => (
        <button
          key={id}
          className={`map-node map-node-${index} map-entrance ${selected === index ? "is-selected" : ""}`}
          onClick={() => onSelect(index)}
          aria-pressed={selected === index}
          aria-controls="nexus-dossier"
        >
          {/* Tactical HUD Corner Brackets */}
          <span className="hud-corner hud-tl" aria-hidden="true" />
          <span className="hud-corner hud-tr" aria-hidden="true" />
          <span className="hud-corner hud-bl" aria-hidden="true" />
          <span className="hud-corner hud-br" aria-hidden="true" />

          <span className="map-node-index">0{index + 1}</span>
          
          <span className="map-node-icon">
            <motion.span
              key={selected === index ? "selected" : "idle"}
              initial={false}
              animate={{
                scale: selected === index && !reduced ? 1.15 : 1,
                rotate: selected === index && !reduced ? -6 : 0,
              }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 280, damping: 18 }
              }
            >
              <Icon size={21} strokeWidth={1.5} />
            </motion.span>
          </span>

          <span className="map-node-copy">
            <strong>{label}</strong>
            <small>{detail}</small>
            <span className="node-telemetry">{nodeTelemetry[index]}</span>
          </span>

          <ArrowUpRight className="map-node-arrow" size={14} />

          {selected === index && (
            <motion.span
              layoutId="active-node"
              className="node-active-mark"
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 240, damping: 28 }
              }
            />
          )}
        </button>
      ))}

      {/* Cyber Horizon Grid Line */}
      <div className="map-horizon" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0 115V80H50V60H75V95H135V45H163V90H205V110H990V90H1035V45H1063V95H1125V60H1150V80H1200V115" />
          <path d="M0 115H1200" />
        </svg>
      </div>

      {/* Tactical Bottom Legend */}
      <div className="map-legend relative z-10">
        <span className="flex items-center gap-2">
          <i /> NODE: {nodes[selected]?.label.toUpperCase()}
        </span>
        <span>CIPHER: AES-256 // BDG: UTC+7</span>
      </div>
    </div>
  );
}
