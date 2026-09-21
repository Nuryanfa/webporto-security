import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function ResonanceField() {
  const root = useRef(null);
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const sx = useSpring(x, { stiffness: 140, damping: 24 });
  const sy = useSpring(y, { stiffness: 140, damping: 24 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine)');
    setFinePointer(query.matches);
    const move = event => { x.set(event.clientX); y.set(event.clientY); };
    if (query.matches && !reduced) window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [reduced, x, y]);

  return <div ref={root} className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="absolute inset-0 resonance-grid opacity-40" />
    <motion.div className="absolute -left-32 top-[18%] h-80 w-80 rounded-full bg-resonance/[.055] blur-[110px]" animate={reduced ? {} : { x: [0, 90, 10], y: [0, -40, 30], scale: [1, 1.2, .95] }} transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
    <motion.div className="absolute -right-20 bottom-[8%] h-72 w-72 rounded-full bg-acid/[.035] blur-[110px]" animate={reduced ? {} : { x: [0, -70, 20], y: [0, 30, -30] }} transition={{ duration: 19, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }} />
    {finePointer && !reduced && <motion.div className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70" style={{ x: sx, y: sy, background: 'radial-gradient(circle, rgba(121,230,223,.09), transparent 65%)' }} />}
  </div>;
}
