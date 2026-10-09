import { Children, Fragment } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
export default function MotionHeading({ children }) {
  const reduced = useReducedMotion();
  let index = 0;
  return (
    <h1>
      {Children.map(children, (child, key) =>
        typeof child === "string" ? (
          child.split(/(\s+)/).map((word, i) =>
            /^\s+$/.test(word) ? (
              word
            ) : (
              <span className="heading-mask" key={`${key}-${i}`}>
                <motion.span
                  initial={reduced ? false : { y: "105%", rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.72,
                    delay: reduced ? 0 : 0.09 + index++ * 0.045,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ),
          )
        ) : (
          <Fragment key={key}>{child}</Fragment>
        ),
      )}
    </h1>
  );
}
