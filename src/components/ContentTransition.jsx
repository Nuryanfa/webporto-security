import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useRef } from "react";
import { gsap, useGSAP } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";

// Incoming panel staggers its [data-stagger] children; the outgoing one fades in place.
function Frame({ children, reduced }) {
  const present = useIsPresent();
  const root = useRef(null);
  useGSAP(
    () => {
      if (reduced || !present) return;
      const targets = gsap.utils.toArray("[data-stagger]", root.current);
      gsap.from(targets, {
        y: 26,
        autoAlpha: 0,
        filter: "blur(6px)",
        duration: 0.95,
        ease: "expo.out",
        stagger: 0.055,
        delay: 0.08,
        clearProps: "filter",
      });
    },
    { scope: root, dependencies: [reduced, present] },
  );
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
      transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
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
