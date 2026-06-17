import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticWrapper({ children, className = "" }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Magnetic pull strength (higher divisor = less pull)
    x.set(middleX / 4);
    y.set(middleY / 4);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      style={{ x, y }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
