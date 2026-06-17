import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CircuitOverlay() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to -1 to 1 based on window size
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: normalizedX, y: normalizedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spring physics for buttery smooth parallax
  const springConfig = { damping: 50, stiffness: 200, mass: 1 };
  const smoothX = useSpring(mousePos.x, springConfig);
  const smoothY = useSpring(mousePos.y, springConfig);

  // Parallax transform: moves opposite to mouse (multiply by pixels of movement)
  const parallaxX = useTransform(smoothX, [-1, 1], [20, -20]);
  const parallaxY = useTransform(smoothY, [-1, 1], [20, -20]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 0.2,
        transition: {
          pathLength: { delay, type: "spring", duration: 3, bounce: 0 },
          opacity: { delay, duration: 0.5 }
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{ x: parallaxX, y: parallaxY }}
      >
        {/* Left Side Circuits */}
        <motion.path
          d="M 50,0 L 50,300 L 150,400 L 150,800 L 50,900 L 50,1000"
          stroke="#00f3ff"
          strokeWidth="1"
          fill="none"
          custom={1}
          variants={draw}
        />
        <motion.circle cx="150" cy="400" r="3" fill="#00f3ff" custom={1} variants={draw} />
        <motion.circle cx="150" cy="800" r="3" fill="#00f3ff" custom={1} variants={draw} />

        <motion.path
          d="M 100,0 L 100,200 L 250,350 L 250,500 L 150,600"
          stroke="#fcee0a"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5,5"
          custom={2}
          variants={draw}
        />
        
        {/* Right Side Circuits */}
        <motion.path
          d="M 950,1000 L 950,700 L 850,600 L 850,200 L 950,100 L 950,0"
          stroke="#00f3ff"
          strokeWidth="1"
          fill="none"
          custom={3}
          variants={draw}
        />
        <motion.circle cx="850" cy="600" r="3" fill="#00f3ff" custom={3} variants={draw} />
        <motion.circle cx="850" cy="200" r="3" fill="#00f3ff" custom={3} variants={draw} />

        {/* Data Packet animations traveling along paths */}
        <circle
          r="2"
          fill="#fff"
          className="travel-packet"
          style={{ offsetPath: "path('M 50,0 L 50,300 L 150,400 L 150,800 L 50,900 L 50,1000')", animationDelay: "2s" }}
        />
        
        <circle
          r="2"
          fill="#fcee0a"
          className="travel-packet"
          style={{ offsetPath: "path('M 950,1000 L 950,700 L 850,600 L 850,200 L 950,100 L 950,0')", animationDuration: "3s", animationDelay: "4s" }}
        />
      </motion.svg>
    </div>
  );
}
