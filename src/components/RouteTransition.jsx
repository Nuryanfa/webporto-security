import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import useReducedMotion from "../utils/useMotionPreference";
const names = {
  "/": "NEXUS",
  "/archive": "OPERATIONS",
  "/timeline": "TRACE",
  "/network": "CHANNEL",
  "/overview": "OVERVIEW",
};
export default function RouteTransition({ children }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  const hasMounted = useRef(false);
  useEffect(() => {
    hasMounted.current = true;
  }, []);
  return (
    <div className="route-stage">
      <div className="route-content">{children}</div>
      {!reduced && hasMounted.current && createPortal(
        <motion.div
          key={`signal-${pathname}`}
          className="route-signal"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 0.46, times: [0, 0.15, 0.62, 1] }}
        >
          <div className="route-signal-panel">
            <svg viewBox="0 0 40 40" aria-hidden="true">
              <circle className="route-signal-track" cx="20" cy="20" r="14" />
              <motion.circle
                className="route-signal-progress"
                cx="20"
                cy="20"
                r="14"
                initial={{ pathLength: 0, rotate: -90 }}
                animate={{ pathLength: 1, rotate: -90 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
              <path d="M20 14v12M14 20h12" />
            </svg>
            <span>{names[pathname] || "INTERFACE"} / CONNECTING</span>
          </div>
        </motion.div>,
        document.body,
      )}
    </div>
  );
}
