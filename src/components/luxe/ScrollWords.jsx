import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../../luxe/gsap";
import useMotionPreference from "../../utils/useMotionPreference";

// Words brighten in reading order as the paragraph scrolls through the viewport.
export default function ScrollWords({ as: Tag = "p", children, className = "" }) {
  const ref = useRef(null);
  const reduced = useMotionPreference();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const split = SplitText.create(ref.current, {
        type: "words",
        autoSplit: true,
        aria: "none",
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { color: "#8a8279" },
            {
              color: "#f3eee6",
              ease: "none",
              stagger: 0.08,
              scrollTrigger: {
                trigger: ref.current,
                start: "top 78%",
                end: "bottom 42%",
                scrub: 0.6,
              },
            },
          );
        },
      });
      return () => split.revert();
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
