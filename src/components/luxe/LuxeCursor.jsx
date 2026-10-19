import { useEffect, useRef } from "react";
import { gsap } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";

const INTERACTIVE = 'a, button:not(:disabled), summary, [role="tab"], input, select, [data-cursor]';

// Decorative follower for fine pointers. The native cursor stays visible.
export default function LuxeCursor() {
  const reduced = useMotionPreference();
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced || !fine.matches || !ring.current) return;
    const el = ring.current;
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;
    let last = null;
    let frame = 0;

    const describe = (node) => {
      const target = node?.closest?.(INTERACTIVE);
      const text = target?.closest("[data-cursor]")?.dataset.cursor || "";
      el.classList.toggle("is-hover", Boolean(target));
      el.classList.toggle("has-label", Boolean(text));
      if (label.current.textContent !== text) label.current.textContent = text;
    };

    const move = (event) => {
      if (event.pointerType !== "mouse") return;
      last = { x: event.clientX, y: event.clientY };
      x(event.clientX);
      y(event.clientY);
      if (!shown) {
        shown = true;
        gsap.set(el, { x: event.clientX, y: event.clientY });
        el.classList.add("is-visible");
      }
      describe(event.target);
    };

    // Content moves under a still pointer while scrolling; re-read what is beneath it.
    const scroll = () => {
      if (!shown || !last || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        describe(document.elementFromPoint(last.x, last.y));
      });
    };
    const hide = () => {
      shown = false;
      el.classList.remove("is-visible");
    };
    const down = () => el.classList.add("is-down");
    const up = () => el.classList.remove("is-down");

    document.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      document.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      cancelAnimationFrame(frame);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <div ref={ring} className="lx-cursor" aria-hidden="true">
      <span ref={label} className="lx-cursor__label" />
    </div>
  );
}
