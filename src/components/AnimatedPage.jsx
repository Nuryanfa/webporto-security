import { motion } from 'framer-motion';
import useReducedMotion from '../utils/useMotionPreference';
import SignalMotion from './SignalMotion';

const animations = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1], // Premium Exponential Out Curve
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: {
      duration: 0.16,
      ease: [0.7, 0, 0.84, 0] // Premium Exponential In Curve
    }
  }
};

export default function AnimatedPage({ children }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={animations}
      initial={reduced ? false : "initial"}
      animate={reduced ? undefined : "animate"}
      exit={reduced ? undefined : "exit"}
      className="h-full w-full relative"
    >
      <SignalMotion>{children}</SignalMotion>
    </motion.div>
  );
}
