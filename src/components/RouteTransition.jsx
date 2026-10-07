import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import useReducedMotion from "../utils/useMotionPreference";
const names = {
  "/": "NEXUS",
  "/archive": "OPERATIONS",
  "/timeline": "TRACE",
  "/network": "CHANNEL",
  "/overview": "OVERVIEW",
};
const geometry = {
  "/": "M0 170H240L330 260H620L710 170H1000",
  "/archive": "M0 260H240L330 170H670L760 260H1000",
  "/timeline":
    "M0 220H240L280 200L320 240L360 130L400 310L440 190L480 220H1000",
  "/network": "M0 220H340L420 140H580L660 220H1000",
};
export default function RouteTransition({ children }) {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  if (reduced)
    return (
      <div className="route-stage">
        <div key={pathname} className="route-content">
          {children}
        </div>
      </div>
    );
  return (
    <div className="route-stage">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pathname}
          className="route-content"
          initial={
            reduced ? false : { opacity: 0, filter: "blur(4px)", scale: 0.992 }
          }
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          exit={
            reduced
              ? { opacity: 1 }
              : { opacity: 0, filter: "blur(2px)", scale: 0.997 }
          }
          transition={{
            duration: reduced ? 0 : 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Page interactions have their own presence boundary; only the
              route frame participates in the navigation exit sequence. */}
          <AnimatePresence initial={false}>{children}</AnimatePresence>
        </motion.div>
      </AnimatePresence>
      {!reduced && (
        <motion.div
          key={`signal-${pathname}`}
          className="route-signal"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: 0.75, times: [0, 0.14, 0.48, 1] }}
        >
          <svg viewBox="0 0 1000 440" preserveAspectRatio="none">
            <motion.path
              d={geometry[pathname] || geometry["/"]}
              fill="none"
              stroke="#91c9c3"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.62, ease: [0.65, 0, 0.35, 1] }}
            />
            <motion.path
              d={geometry[pathname] || geometry["/"]}
              fill="none"
              stroke="#b5d8cd"
              strokeWidth="3"
              strokeDasharray=".02 .98"
              pathLength="1"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          </svg>
          <span>{names[pathname] || "INTERFACE"} / CONNECTING</span>
        </motion.div>
      )}
    </div>
  );
}
