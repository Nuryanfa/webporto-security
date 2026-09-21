import { motion, useReducedMotion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, y: 30, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Premium Exponential Out Curve
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -30, 
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
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
      {!reduced && <motion.div initial={{ scaleX: 1 }} animate={{ scaleX: 0 }} transition={{ duration: .65, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-y-0 left-0 right-0 z-40 origin-right bg-resonance/10 backdrop-blur-md pointer-events-none" />}
      {children}
    </motion.div>
  );
}
