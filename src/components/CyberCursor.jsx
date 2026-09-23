import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import useReducedMotion from '../utils/useMotionPreference';

export default function CyberCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState(0);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    setEnabled(media.matches && !reduced);
    if (!media.matches || reduced) return;
    const move = event => {
      x.set(event.clientX); y.set(event.clientY);
      setActive(Boolean(event.target.closest('a, button, [data-cursor="active"]')));
    };
    const down = () => { setPressed(true); setPulse(value => value + 1); };
    const up = () => setPressed(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', up); };
  }, [reduced, x, y]);

  if (!enabled) return null;
  return <>
    <motion.div className="cyber-cursor-dot" style={{ x, y }} animate={{ scale: pressed ? .4 : active ? 1.8 : 1 }} />
    <motion.div className="cyber-cursor-ring" style={{ x: ringX, y: ringY }} animate={{ scale: pressed ? .65 : active ? 1.65 : 1, rotate: active ? 135 : 0, borderColor: active ? '#e8f53b' : '#79e6df' }} />
    <AnimatePresence>{pulse > 0 && <motion.div key={pulse} className="cyber-click-pulse" style={{ x, y }} initial={{ scale: .2, opacity: .9 }} animate={{ scale: 2.8, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} />}</AnimatePresence>
  </>;
}
