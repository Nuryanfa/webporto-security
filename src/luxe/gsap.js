// Single registration point for GSAP plugins so every component shares one instance.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  soft: "power3.out",
};

// The intro preloader hides the first paint; hero reveals wait for it.
let introDone = typeof window === "undefined";
export function isIntroDone() {
  return introDone;
}
export function markIntroDone() {
  if (introDone) return;
  introDone = true;
  // Dispatch outside the caller's stack: GSAP runs timeline callbacks inside the
  // timeline's context, and listeners must not have their tweens adopted (and later
  // reverted) by the preloader.
  queueMicrotask(() => window.dispatchEvent(new Event("lx:intro-done")));
}
export function onIntroDone(callback) {
  if (introDone) {
    callback();
    return () => {};
  }
  window.addEventListener("lx:intro-done", callback, { once: true });
  return () => window.removeEventListener("lx:intro-done", callback);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
