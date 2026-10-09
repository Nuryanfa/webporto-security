import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { animate, createScope, stagger } from 'animejs';
import useReducedMotion from '../utils/useMotionPreference';

const variants = { '/': 'nexus', '/archive': 'operations', '/timeline': 'trace', '/network': 'channel' };

export default function RoutePortal() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  const root = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const changed = previous.current !== pathname;
    previous.current = pathname;
    if (!changed || reduced || !variants[pathname]) return;
    const scope = createScope({ root: root.current }).add(() => {
      animate('.portal-mark', { scale: [.3, 1.2], opacity: [0.55, 0], rotate: pathname === '/network' ? [0, 95] : [0, 0], duration: 650, ease: 'out(3)' });
      animate('.portal-streak', { scaleX: [0, 1], opacity: [.7, 0], delay: stagger(40), duration: 550, ease: 'out(3)' });
    });
    return () => scope.revert();
  }, [pathname, reduced]);
  return reduced ? null : <div ref={root} className={`route-portal portal-${variants[pathname] || 'nexus'}`} aria-hidden="true"><div className="portal-mark" /><div className="portal-streak" /><div className="portal-streak" /><div className="portal-streak" /></div>;
}
