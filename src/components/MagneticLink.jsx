import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import useReducedMotion from "../utils/useMotionPreference";

const RouterLink = motion(Link);
export default function MagneticLink({ to, children, ...props }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 240, damping: 22, mass: 0.4 });
  const reset = () => { x.set(0); y.set(0); };
  const Component = to ? RouterLink : motion.a;
  return <Component {...props} {...(to ? { to } : {})}
    style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
    onPointerMove={event => {
      if (reduced || event.pointerType !== "mouse") return;
      const r = event.currentTarget.getBoundingClientRect();
      x.set(((event.clientX - r.left) / r.width - 0.5) * 6);
      y.set(((event.clientY - r.top) / r.height - 0.5) * 4);
    }}
    onPointerLeave={reset} onBlur={reset}
    whileTap={reduced ? undefined : { scale: 0.98 }}>
    {children}
  </Component>;
}
