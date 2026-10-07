import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import useReducedMotion from "../utils/useMotionPreference";
export default function NexusScene({ nodes, selected, onSelect }) {
  const root = useRef(null),
    reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 24 }),
    sy = useSpring(y, { stiffness: 90, damping: 24 });
  useEffect(() => {
    if (reduced) return;
    const scope = createScope({ root: root.current }).add(() => {
      animate(".map-entrance", {
        opacity: [0, 1],
        delay: stagger(70),
        duration: 750,
        ease: "out(4)",
      });
      animate(".map-route-base", {
        strokeDashoffset: [1, 0],
        duration: 1100,
        ease: "inOut(3)",
      });
    });
    return () => scope.revert();
  }, [reduced]);
  const move = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 8);
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
      <span className="map-coordinate coordinate-nw">01—04 / EXPLORER</span>
      <span className="map-coordinate coordinate-ne">PERSONAL NETWORK</span>
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
            <motion.path
              d={d}
              fill="none"
              stroke="#9bcac4"
              strokeWidth="1"
              initial={false}
              animate={{
                pathLength: selected === i ? 1 : 0,
                opacity: selected === i ? 0.7 : 0,
              }}
              transition={{
                duration: reduced ? 0 : 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </g>
        ))}
      </svg>
      <motion.div
        className="map-parallax"
        style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      >
        <div className="map-core map-entrance">
          <span className="map-core-caption">BUILD · DEFEND · REFINE</span>
          <svg
            viewBox="0 0 300 300"
            className="core-instrument"
            aria-hidden="true"
          >
            <circle cx="150" cy="150" r="146" />
            <circle className="instrument-ticks" cx="150" cy="150" r="134" />
            <circle className="instrument-arc" cx="150" cy="150" r="122" />
          </svg>
          <div className="core-portrait">
            <img
              src="/profile.webp"
              alt="Muhamad Nur Yanfa"
              fetchPriority="high"
            />
          </div>
          <div className="core-nameplate">
            <span>NY—07</span>
            <i />
            BACKEND / SECURITY
          </div>
        </div>
      </motion.div>
      {nodes.map(({ id, label, detail, icon: Icon }, index) => (
        <button
          key={id}
          className={`map-node map-node-${index} map-entrance ${selected === index ? "is-selected" : ""}`}
          onClick={() => onSelect(index)}
          aria-pressed={selected === index}
          aria-controls="nexus-dossier"
        >
          <span className="map-node-index">0{index + 1}</span>
          <span className="map-node-icon">
            <Icon size={21} strokeWidth={1.4} />
          </span>
          <span className="map-node-copy">
            <strong>{label}</strong>
            <small>{detail}</small>
          </span>
          <ArrowUpRight className="map-node-arrow" size={14} />
          {selected === index && (
            <motion.span
              layoutId="active-node"
              className="node-active-mark"
              transition={
                reduced
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 220, damping: 30 }
              }
            />
          )}
        </button>
      ))}
      <div className="map-horizon" aria-hidden="true">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0 115V80H50V60H75V95H135V45H163V90H205V110H990V90H1035V45H1063V95H1125V60H1150V80H1200V115" />
          <path d="M0 115H1200" />
        </svg>
      </div>
      <div className="map-legend">
        <span>
          <i /> SELECTED NODE
        </span>
        <span>SELECT TO PREVIEW · OPEN TO EXPLORE</span>
      </div>
    </div>
  );
}
