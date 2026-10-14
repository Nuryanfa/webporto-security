import { useEffect } from "react";

const MAX_DEG = 5;

/**
 * Single delegated listener: any element with `.holo-tilt` gets --tilt-x/--tilt-y
 * (degrees) and --sheen-x/--sheen-y (%) set from the pointer. CSS does the rest.
 * Disabled for touch/pen and when motion is reduced.
 */
export default function useHoloTilt(reduced) {
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let current = null;

    const reset = (el) => {
      if (!el) return;
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      el.classList.remove("is-tilting");
    };

    const onMove = (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.target.closest?.(".holo-tilt");
      if (el !== current) {
        reset(current);
        current = el;
      }
      if (!el) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.classList.add("is-tilting");
        el.style.setProperty("--tilt-y", `${((px - 0.5) * 2 * MAX_DEG).toFixed(2)}deg`);
        el.style.setProperty("--tilt-x", `${((0.5 - py) * 2 * MAX_DEG).toFixed(2)}deg`);
        el.style.setProperty("--sheen-x", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--sheen-y", `${(py * 100).toFixed(1)}%`);
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      reset(current);
      current = null;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      reset(current);
    };
  }, [reduced]);
}
