import { useEffect, useRef } from 'react';
import { animate, createScope, createTimeline, stagger } from 'animejs';
import useReducedMotion from '../utils/useMotionPreference';

// Owns only its decorative elements; never competes with Framer's transforms.
export default function SignalMotion({ children }) {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const element = root.current;
    const scope = createScope({ root: element }).add(() => {
      createTimeline()
        .add('.signal-shutter', { scaleX: [1, 0], duration: 650, delay: stagger(45), ease: 'inOut(4)' })
        .add('.signal-rule', { scaleX: [0, 1], duration: 850, ease: 'out(4)' }, 160);
    });
    let ripple;
    const respond = event => {
      if (!event.target.closest('button, a')) return;
      const rect = element.getBoundingClientRect();
      const pulse = element.querySelector('.signal-response');
      const target = event.target.closest('button, a').getBoundingClientRect();
      pulse.style.left = `${(event.type === 'focusin' ? target.left + target.width / 2 : event.clientX) - rect.left}px`;
      pulse.style.top = `${(event.type === 'focusin' ? target.top + target.height / 2 : event.clientY) - rect.top}px`;
      ripple?.cancel();
      ripple = animate(pulse, { scale: [.2, 3.4], opacity: [.8, 0], duration: 800, ease: 'out(3)' });
    };
    element.addEventListener('pointerdown', respond);
    element.addEventListener('focusin', respond);
    return () => {
      ripple?.revert();
      scope.revert();
      element.removeEventListener('pointerdown', respond);
      element.removeEventListener('focusin', respond);
    };
  }, [reduced]);

  return <div ref={root} className="signal-motion">
    {!reduced && <div className="signal-shutters" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <i key={i} className="signal-shutter" />)}</div>}
    <div className="signal-rule" aria-hidden="true" />
    <div className="signal-response" aria-hidden="true" />
    {children}
  </div>;
}
