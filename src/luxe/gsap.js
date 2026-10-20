// Single registration point for GSAP plugins so every component shares one instance.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });

  // Web fonts (the large Mincho face especially) often arrive after the load
  // event and reflow the page; re-measure triggers whenever a batch finishes.
  let pending = 0;
  const remeasure = () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(() => ScrollTrigger.refresh());
  };
  document.fonts?.ready.then(remeasure);
  document.fonts?.addEventListener?.("loadingdone", remeasure);
}

/*
 * "Stage ready" = the intro preloader has finished AND no route curtain is
 * covering the page. Entrance reveals wait for it so they play in view.
 * Events are dispatched in a microtask: GSAP runs timeline callbacks inside
 * the timeline's context, and listeners must not have their tweens adopted
 * (and later reverted) by the preloader or curtain.
 */
const isServer = typeof window === "undefined";
let introDone = isServer;
let curtainDown = false;

function stageReady() {
  return introDone && !curtainDown;
}
function announce() {
  if (stageReady()) queueMicrotask(() => window.dispatchEvent(new Event("lx:stage-ready")));
}

export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  announce();
}
export function setCurtain(down) {
  curtainDown = down;
  if (!down) announce();
}

export function onStageReady(callback) {
  if (stageReady()) {
    callback();
    return () => {};
  }
  const handler = () => {
    if (!stageReady()) return;
    window.removeEventListener("lx:stage-ready", handler);
    callback();
  };
  window.addEventListener("lx:stage-ready", handler);
  return () => window.removeEventListener("lx:stage-ready", handler);
}

// Backwards-compatible name used by components written before the curtain gate.
export const onIntroDone = onStageReady;

export { gsap, ScrollTrigger, SplitText, useGSAP };
