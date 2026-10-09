import { useEffect, useRef, useSyncExternalStore } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  getPreferences,
  setPreferences,
  subscribePreferences,
} from "../utils/experiencePreferences";

const options = [
  { value: "system", label: "Device" },
  { value: "full", label: "Full" },
  { value: "reduced", label: "Reduced" },
];

export default function MotionControl() {
  const details = useRef(null);
  const { pathname } = useLocation();
  const { motion } = useSyncExternalStore(
    subscribePreferences,
    getPreferences,
    getPreferences,
  );
  useEffect(() => {
    if (details.current) details.current.open = false;
  }, [pathname]);
  useEffect(() => {
    const closeOutside = (event) => {
      if (details.current && !details.current.contains(event.target)) {
        details.current.open = false;
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details
      className="motion-control"
      ref={details}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label="Motion settings">
        <SlidersHorizontal size={15} />
        <span>Motion</span>
      </summary>
      <div className="motion-control-menu" role="group" aria-label="Motion preference">
        <span>DISPLAY MOTION</span>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            aria-pressed={motion === option.value}
            onClick={() => {
              setPreferences({ motion: option.value });
              details.current.open = false;
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}
