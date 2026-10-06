import { motion, useMotionValue, useSpring } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import WorldBackdrop from "./WorldBackdrop";
import useReducedMotion from "../utils/useMotionPreference";
export default function IdentityScene() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 110, damping: 24 }),
    sy = useSpring(y, { stiffness: 110, damping: 24 });
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const move = (e) => {
    if (reduced || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  return (
    <div className="identity-scene" onPointerMove={move} onPointerLeave={reset}>
      <WorldBackdrop />
      <div className="scene-caption">
        <span>IDENTITY / NY—07</span>
        <ShieldCheck size={15} />
      </div>
      <motion.div
        className="identity-depth"
        style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
      >
        <div className="identity-rings">
          <span className="identity-orbit orbit-outer" />
          <span className="identity-orbit orbit-inner" />
          <div className="identity-cross cross-h" />
          <div className="identity-cross cross-v" />
          <div className="identity-photo">
            <img
              src="/profile.webp"
              alt="Muhamad Nur Yanfa"
              fetchPriority="high"
            />
          </div>
          <span className="orbit-point point-a" />
          <span className="orbit-point point-b" />
        </div>
      </motion.div>
      <div className="scene-foot">
        <span>開発者 / DEVELOPER</span>
        <span>6°55′ S · 107°36′ E</span>
      </div>
    </div>
  );
}
