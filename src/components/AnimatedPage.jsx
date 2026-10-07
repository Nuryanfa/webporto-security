import { useEffect, useRef } from "react";
import { animate, createScope, stagger } from "animejs";
import useReducedMotion from "../utils/useMotionPreference";
export default function AnimatedPage({ children }) {
  const root = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const scope = createScope({ root: root.current }).add(() => {
      animate(
        ".operation-header,.trace-title,.channel-heading,.experience-masthead",
        { opacity: [0, 1], translateY: [12, 0], duration: 750, ease: "out(4)" },
      );
      animate(".operation-console,.trace-console,.channel-console,.nexus-map", {
        opacity: [0, 1],
        translateY: [22, 0],
        duration: 850,
        delay: 130,
        ease: "out(4)",
      });
      animate(
        ".operation-selector>button,.channel-tabs>button,.trace-axis>button",
        {
          opacity: [0, 1],
          translateY: [8, 0],
          delay: stagger(65, { start: 240 }),
          duration: 650,
          ease: "out(4)",
        },
      );
    });
    return () => scope.revert();
  }, [reduced]);
  return (
    <div ref={root} className="animated-page">
      {children}
    </div>
  );
}
