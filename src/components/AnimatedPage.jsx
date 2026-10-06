import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
export default function AnimatedPage({ children }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.18, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
