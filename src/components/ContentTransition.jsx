import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
function Frame({ children, reduced }) {
  const present = useIsPresent();
  return (
    <motion.div
      className="content-frame"
      aria-hidden={present ? undefined : true}
      inert={present ? undefined : ""}
      style={{ pointerEvents: present ? "auto" : "none" }}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
export default function ContentTransition({ id, children, className = "" }) {
  const reduced = useReducedMotion();
  return (
    <div className={`content-transition ${className}`}>
      <AnimatePresence initial={false} mode="sync">
        <Frame key={id} reduced={reduced}>
          {children}
        </Frame>
      </AnimatePresence>
    </div>
  );
}
