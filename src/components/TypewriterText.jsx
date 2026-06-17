import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TypewriterText({ text, delay = 0, speed = 50, className = '' }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout;
    let currentIndex = 0;

    const startTyping = () => {
      timeout = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText((prev) => prev + text.charAt(currentIndex));
          currentIndex++;
        } else {
          clearInterval(timeout);
          setIsComplete(true);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearInterval(timeout);
      clearTimeout(initialDelay);
    };
  }, [text, delay, speed]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        className={`inline-block w-[0.5em] h-[1em] ml-1 align-middle ${isComplete ? 'bg-cyber-cyan/50' : 'bg-cyber-cyan'}`}
      />
    </span>
  );
}
