import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootSequence({ onComplete }) {
  const [logs, setLogs] = useState([]);
  const [isDone, setIsDone] = useState(false);

  const bootLogs = [
    "INITIATING SYSTEM BOOT...",
    "LOADING KERNEL MODULES... [OK]",
    "MOUNTING ENCRYPTED VOLUMES... [OK]",
    "ESTABLISHING SECURE CONNECTION TO MAINFRAME...",
    "HANDSHAKE ACCEPTED.",
    "DECRYPTING USER PROFILE: ROOT",
    "BYPASSING FIREWALL... [SUCCESS]",
    "LOADING TACTICAL HUD...",
    "INITIALIZING NEURAL LINK...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 500); // Wait for fade out
        }, 800);
      }
    }, 150); // Speed of logs appearing

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-tactical-black flex flex-col items-start justify-end p-8 md:p-16 font-code text-sm md:text-base overflow-hidden"
        >
          {/* CRT scanline effect specifically for boot screen */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-10"></div>
          
          <div className="relative z-20 w-full max-w-3xl">
            {logs.map((log, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${log.includes('SUCCESS') || log.includes('OK') || log.includes('READY') ? 'text-cyber-cyan' : 'text-on-surface-variant'}`}
              >
                <span className="text-secondary-fixed-dim mr-2">&gt;</span> {log}
              </motion.div>
            ))}
            <motion.div 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-3 h-5 bg-cyber-cyan mt-2"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
