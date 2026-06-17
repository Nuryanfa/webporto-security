import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlitchBlur({ children, isActive = true, intensity = "medium" }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    // Trigger glitch randomly every 3-6 seconds
    const interval = setInterval(() => {
      setIsGlitching(true);
      // Glitch lasts for 0.3 - 0.8 seconds
      setTimeout(() => {
        setIsGlitching(false);
      }, 300 + Math.random() * 500);
    }, 3000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return <>{children}</>;

  // Randomize block positions to create the mosaic sensor look
  const generateBlocks = () => {
    const blocks = [];
    const blockCount = intensity === "high" ? 20 : 12;
    for (let i = 0; i < blockCount; i++) {
      const width = 15 + Math.random() * 30; // 15% to 45%
      const height = 15 + Math.random() * 30;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      
      blocks.push(
        <motion.div
          key={i}
          className="absolute bg-white/5 backdrop-blur-xl mix-blend-overlay border border-white/10"
          style={{ width: `${width}%`, height: `${height}%`, top: `${top}%`, left: `${left}%` }}
          animate={{
            top: [`${top}%`, `${Math.random() * 100}%`, `${top}%`],
            left: [`${left}%`, `${Math.random() * 100}%`, `${left}%`],
            opacity: [0.8, 1, 0.5, 0.8]
          }}
          transition={{
            duration: 0.2 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        />
      );
    }
    return blocks;
  };

  return (
    <div className="relative inline-block group">
      {/* Original Content */}
      <div className="relative z-0">
        {children}
      </div>

      <AnimatePresence>
        {isGlitching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 backdrop-blur-[12px] backdrop-brightness-110 backdrop-saturate-200 pointer-events-none" 
            style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)' }}
          >
            {generateBlocks()}
            
            {/* Rapid Glitch Cutouts */}
            <motion.div 
              className="absolute inset-0 backdrop-invert opacity-20 mix-blend-difference"
              animate={{
                clipPath: [
                  'polygon(0 10%, 100% 10%, 100% 20%, 0 20%)',
                  'polygon(0 50%, 100% 50%, 100% 60%, 0 60%)',
                  'polygon(0 80%, 100% 80%, 100% 90%, 0 90%)',
                  'polygon(0 30%, 100% 30%, 100% 40%, 0 40%)'
                ],
                opacity: [0, 0.5, 0, 0.3, 0]
              }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Glitch Overlay Text */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <span className="font-code text-error text-xs bg-black/80 px-2 py-1 border border-error/50">
                [ DATA_CORRUPTED ]
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
