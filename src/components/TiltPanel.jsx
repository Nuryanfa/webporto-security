import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import useReducedMotion from '../utils/useMotionPreference';

export default function TiltPanel({ children, className = '' }) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-.5, .5], [7, -7]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-.5, .5], [-9, 9]), { stiffness: 180, damping: 20 });
  const handleMove = event => {
    if (reduced || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    mx.set((event.clientX - rect.left) / rect.width - .5);
    my.set((event.clientY - rect.top) / rect.height - .5);
  };
  const reset = () => { mx.set(0); my.set(0); };
  return <motion.div onPointerMove={handleMove} onPointerLeave={reset} style={reduced ? {} : { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }} whileHover={reduced ? {} : { scale: 1.018 }} className={className}>{children}</motion.div>;
}
