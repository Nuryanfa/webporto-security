import { useState, useEffect } from 'react';

const chars = "!<>-_\\\\/[]{}—=+*^?#________";
const decryptedCache = new Set(); // Global cache for current session

export default function DecryptText({ text, speed = 40, maxIterations = 10, className = "" }) {
  // If already decrypted in this session, show full text immediately
  const [displayText, setDisplayText] = useState(() => decryptedCache.has(text) ? text : "");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Skip if already in cache and not a hover trigger
    if (decryptedCache.has(text) && !isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval = null;

    const decrypt = () => {
      clearInterval(interval);
      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          decryptedCache.add(text); // Mark as decrypted for this session
        }
        
        iteration += 1 / (maxIterations / 3);
      }, speed);
    };

    decrypt();

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, isHovering]);

  return (
    <span 
      className={className} 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
}
