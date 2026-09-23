import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import useReducedMotion from '../utils/useMotionPreference';

const glyphs = '01/:+<>_';

// The accessible label stays stable while decorative glyphs resolve left to right.
export default function DecodeText({ text }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const spans = [...ref.current.children];
    if (reduced) return;
    const progress = { value: 0 };
    let previousFrame = -1;
    const animation = animate(progress, {
      value: text.length + 4,
      duration: Math.min(1100, 400 + text.length * 18),
      ease: 'out(2)',
      onUpdate: () => {
        const frame = Math.floor(progress.value * 3);
        if (frame === previousFrame) return;
        previousFrame = frame;
        spans.forEach((span, index) => {
          const resolved = index <= progress.value;
          span.textContent = resolved || text[index] === ' ' ? text[index] : glyphs[(index + frame) % glyphs.length];
          span.style.opacity = resolved ? '1' : '.38';
        });
      },
      onComplete: () => spans.forEach((span, i) => { span.textContent = text[i]; span.style.opacity = '1'; }),
    });
    return () => {
      animation.cancel();
      spans.forEach((span, i) => { span.textContent = text[i]; span.style.opacity = '1'; });
    };
  }, [text, reduced]);
  return <span aria-label={text}><span ref={ref} aria-hidden="true" className="decode-text">{text.split('').map((char, i) => <span key={`${text}-${i}`}>{char}</span>)}</span></span>;
}
