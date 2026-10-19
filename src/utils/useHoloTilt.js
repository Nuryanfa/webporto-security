import { useEffect } from "react";

const MAX_DEG = 5;
const LERP = 0.12;

/** A single delegated listener owns pointer tilt for every .holo-tilt surface. */
export default function useHoloTilt(reduced) {
  useEffect(() => {
    if (reduced) return;
    const surfaces = new Map();
    let frame = 0;
    let active = null;

    const ensure = (element) => {
      if (!surfaces.has(element)) {
        surfaces.set(element, { x: 0, y: 0, targetX: 0, targetY: 0,
          holoX: 50, holoY: 50, targetHoloX: 50, targetHoloY: 50 });
      }
      return surfaces.get(element);
    };
    const tick = () => {
      let needsFrame = false;
      for (const [element, state] of surfaces) {
        if (!element.isConnected) {
          surfaces.delete(element);
          if (active === element) active = null;
          continue;
        }
        state.x += (state.targetX - state.x) * LERP;
        state.y += (state.targetY - state.y) * LERP;
        state.holoX += (state.targetHoloX - state.holoX) * LERP;
        state.holoY += (state.targetHoloY - state.holoY) * LERP;
        element.style.setProperty("--tilt-x", `${state.x.toFixed(2)}deg`);
        element.style.setProperty("--tilt-y", `${state.y.toFixed(2)}deg`);
        element.style.setProperty("--holo-x", `${state.holoX.toFixed(1)}%`);
        element.style.setProperty("--holo-y", `${state.holoY.toFixed(1)}%`);
        const settled = Math.abs(state.targetX - state.x) < .02 &&
            Math.abs(state.targetY - state.y) < .02 &&
            Math.abs(state.targetHoloX - state.holoX) < .1 &&
            Math.abs(state.targetHoloY - state.holoY) < .1;
        if (!settled) needsFrame = true;
        if (settled && element !== active) {
          element.style.removeProperty("--tilt-x");
          element.style.removeProperty("--tilt-y");
          element.style.removeProperty("--holo-x");
          element.style.removeProperty("--holo-y");
          surfaces.delete(element);
        }
      }
      frame = needsFrame ? requestAnimationFrame(tick) : 0;
    };
    const start = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const release = () => {
      if (!active) return;
      const state = ensure(active);
      state.targetX = state.targetY = 0;
      state.targetHoloX = state.targetHoloY = 50;
      active.classList.remove("is-tilting");
      active = null;
      start();
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      const element = event.target.closest?.(".holo-tilt");
      if (element !== active) release();
      if (!element) return;
      active = element;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const state = ensure(element);
      state.targetX = (0.5 - y) * 2 * MAX_DEG;
      state.targetY = (x - 0.5) * 2 * MAX_DEG;
      state.targetHoloX = x * 100;
      state.targetHoloY = y * 100;
      element.classList.add("is-tilting");
      start();
    };
    const leave = (event) => {
      if (active && !active.contains(event.relatedTarget)) release();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      for (const element of surfaces.keys()) {
        element.classList.remove("is-tilting");
        ["--tilt-x", "--tilt-y", "--holo-x", "--holo-y"].forEach((key) => element.style.removeProperty(key));
      }
    };
  }, [reduced]);
}
