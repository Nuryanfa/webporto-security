import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";

// Link or anchor that leans slightly toward a fine pointer.
export default function MagneticLink({ to, children, ...props }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const movers = useRef(null);

  useEffect(() => {
    if (reduced || !ref.current) return;
    movers.current = {
      x: gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3" }),
      y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3" }),
    };
    const el = ref.current;
    return () => {
      movers.current = null;
      gsap.set(el, { clearProps: "transform" });
    };
  }, [reduced]);

  const move = (event) => {
    if (!movers.current || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    movers.current.x(((event.clientX - rect.left) / rect.width - 0.5) * 8);
    movers.current.y(((event.clientY - rect.top) / rect.height - 0.5) * 6);
  };
  const reset = () => {
    movers.current?.x(0);
    movers.current?.y(0);
  };

  const shared = { ref, onPointerMove: move, onPointerLeave: reset, onBlur: reset, ...props };
  return to ? (
    <Link to={to} {...shared}>
      {children}
    </Link>
  ) : (
    <a {...shared}>{children}</a>
  );
}
