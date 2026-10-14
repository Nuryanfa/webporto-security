import { useEffect, useRef, useState } from "react";
import useReducedMotion from "../utils/useMotionPreference";

// Clean, high-tech glyphs that maintain consistent visual weight
const CYBER_GLYPHS = "0123456789ABCDEF!#%&*+=<>[]_";

/**
 * Senior-Grade Cyber Scramble/Decode Text Component.
 * - ZERO layout jitter: maintains precise character count and layout metrics throughout.
 * - Smooth progressive reveal from left to right.
 * - Active frontier characters highlighted with subtle resonance cyan glow.
 * - Respects reduced-motion preference without any delay.
 */
export default function DecodeText({
  text = "",
  className = "",
  speed = 28, // ms per tick
  revealStep = 1, // characters settled per step
}) {
  const reduced = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const [frontierIndex, setFrontierIndex] = useState(-1);
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!text) {
      setDisplayText("");
      setFrontierIndex(-1);
      return;
    }

    if (reduced) {
      setDisplayText(text);
      setFrontierIndex(-1);
      return;
    }

    // Cancel any ongoing frame/timeout
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const target = text;
    const len = target.length;
    let settledCount = 0;
    let lastTick = performance.now();

    // Generate random glyph for non-space characters
    const randomGlyph = (origChar) => {
      if (origChar === " " || origChar === "\n" || origChar === "\t") return origChar;
      return CYBER_GLYPHS[Math.floor(Math.random() * CYBER_GLYPHS.length)];
    };

    const updateFrame = (now) => {
      if (now - lastTick >= speed) {
        lastTick = now;

        // Progressively advance settled characters
        settledCount = Math.min(len, settledCount + revealStep);
        setFrontierIndex(settledCount);

        let result = "";
        for (let i = 0; i < len; i++) {
          if (i < settledCount) {
            result += target[i];
          } else {
            result += randomGlyph(target[i]);
          }
        }
        setDisplayText(result);

        if (settledCount >= len) {
          setDisplayText(target);
          setFrontierIndex(-1);
          return;
        }
      }

      frameRef.current = requestAnimationFrame(updateFrame);
    };

    // Initial tick to populate stable scrambled string matching exact target length
    let initialScrambled = "";
    for (let i = 0; i < len; i++) {
      initialScrambled += randomGlyph(target[i]);
    }
    setDisplayText(initialScrambled);
    setFrontierIndex(0);

    frameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, reduced, speed, revealStep]);

  if (reduced || frontierIndex === -1) {
    return <span className={`decode-text inline-block ${className}`}>{text}</span>;
  }

  // Render with styled frontier for a smooth, high-tech glowing edge
  const settledPart = displayText.slice(0, frontierIndex);
  const frontierChar = displayText.slice(frontierIndex, frontierIndex + 2);
  const remainingPart = displayText.slice(frontierIndex + 2);

  return (
    <span
      className={`decode-text inline-block select-none font-feature-tabular ${className}`}
      aria-label={text}
      style={{
        fontVariantNumeric: "tabular-nums",
        willChange: "contents",
      }}
    >
      <span>{settledPart}</span>
      {frontierChar && (
        <span
          className="text-resonance inline"
          style={{
            textShadow: "0 0 8px rgba(0, 243, 255, 0.75)",
            opacity: 0.95,
          }}
        >
          {frontierChar}
        </span>
      )}
      {remainingPart && (
        <span className="opacity-40 text-resonance/60 inline">
          {remainingPart}
        </span>
      )}
    </span>
  );
}
