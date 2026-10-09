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
        ".operation-header,.trace-title,.channel-heading,.experience-masthead,.overview-heading",
        { translateY: [12, 0], duration: 600, ease: "out(4)" },
      );
      animate(".operation-console,.trace-console,.channel-console,.nexus-map", {
        translateY: [22, 0],
        duration: 680,
        delay: 80,
        ease: "out(4)",
      });
      animate(
        ".operation-selector>button,.channel-tabs>button,.trace-axis>button",
        {
          translateY: [8, 0],
          delay: stagger(45, { start: 160 }),
          duration: 520,
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
