import { motion } from 'framer-motion';

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
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full w-full relative"
    >
      {/* Cyber Wipe Element */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-cyber-cyan z-50 origin-top pointer-events-none mix-blend-overlay"
      />
      {children}
    </motion.div>
  );
}
