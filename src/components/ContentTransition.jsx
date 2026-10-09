import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import useReducedMotion from "../utils/useMotionPreference";
function Frame({ children, reduced }) {
  const present = useIsPresent();
  const root = useRef(null);
  useEffect(() => {
    if (reduced || !present) return;
    const scope = createScope({ root: root.current }).add(() => {
      const candidates = [...root.current.querySelectorAll(
        ".map-dossier-grid>div,.dossier-top,h2,.dossier-summary,.dossier-outcome,.project-actions,.trace-record>*,.channel-readout>span,.channel-actions,.tech-tag"
      )];
      // Animate a group or its children, never both on the same axis.
      const targets = candidates.filter(el => !candidates.some(other => other !== el && other.contains(el)));
      animate(targets, {
        translateY: [12, 0],
        delay: stagger(45, { start: 40 }), duration: 560, ease: "out(4)",
      });
    });
    return () => scope.revert();
  }, [reduced, present]);
  return (
    <motion.div
      ref={root}
      className="content-frame"
      aria-hidden={present ? undefined : true}
      inert={present ? undefined : ""}
      style={{ pointerEvents: present ? "auto" : "none" }}
      initial={false}
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
