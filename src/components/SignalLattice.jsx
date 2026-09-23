import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import useReducedMotion from '../utils/useMotionPreference';
import { useLocation } from 'react-router-dom';

const colors = { '/': [121, 230, 223], '/archive': [232, 245, 59], '/timeline': [121, 230, 223], '/network': [121, 170, 255] };

export default function SignalLattice() {
  const canvas = useRef(null);
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return;
    const surface = canvas.current;
    const context = surface.getContext('2d');
    if (!context) return;
    let width = 0, height = 0;
    const cursor = { x: .5, y: .5 };
    const smooth = { x: .5, y: .5 };
    const clock = { phase: 0 };
    const rgb = colors[pathname] || colors['/'];
    const resize = () => {
      width = surface.clientWidth;
      height = surface.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(surface);
    resize();
    const move = event => { if (event.pointerType === 'mouse') { cursor.x = event.clientX / width; cursor.y = event.clientY / height; } };
    window.addEventListener('pointermove', move, { passive: true });
    // One shared Anime clock; no React renders or layout reads inside the frame loop.
    const animation = animate(clock, {
      phase: [0, Math.PI * 2], duration: 24000, loop: true, ease: 'linear',
      onUpdate: () => {
        smooth.x += (cursor.x - smooth.x) * .045;
        smooth.y += (cursor.y - smooth.y) * .045;
        context.clearRect(0, 0, width, height);
        const mobile = width < 768;
        const rows = mobile ? 6 : 12;
        const columns = mobile ? 14 : 26;
        const spacing = width / columns;
        for (let row = 0; row < rows; row++) {
          context.beginPath();
          for (let col = 0; col <= columns; col++) {
            const x = col * spacing;
            const envelope = Math.sin(col / columns * Math.PI);
            const wave = Math.sin(col * .32 + row * .25 + clock.phase * 2) * (20 + smooth.y * 25) * envelope;
            const y = height * .73 + row * 17 + wave + (smooth.x - .5) * (col - columns / 2) * 2;
            if (col === 0) context.moveTo(x, y); else context.lineTo(x, y);
          }
          context.strokeStyle = `rgba(${rgb.join(',')},${.045 + row / rows * .12})`;
          context.lineWidth = 1;
          context.stroke();
          const travel = (clock.phase / (Math.PI * 2) * 3 + row / rows) % 1;
          const col = travel * columns;
          const x = travel * width;
          const y = height * .73 + row * 17 + Math.sin(col * .32 + row * .25 + clock.phase * 2) * (20 + smooth.y * 25) * Math.sin(travel * Math.PI) + (smooth.x - .5) * (col - columns / 2) * 2;
          context.fillStyle = `rgba(${rgb.join(',')},.65)`;
          context.fillRect(x, y - 1.5, 6, 3);
        }
      },
    });
    const visibility = () => document.hidden ? animation.pause() : animation.resume();
    document.addEventListener('visibilitychange', visibility);
    visibility();
    return () => { animation.cancel(); observer.disconnect(); window.removeEventListener('pointermove', move); document.removeEventListener('visibilitychange', visibility); };
  }, [reduced, pathname]);
  return reduced ? null : <canvas ref={canvas} className="signal-lattice" aria-hidden="true" />;
}
