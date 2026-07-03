import { useState, useRef } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';
import { motion } from 'framer-motion';
import { FlaskConical, Shield, Server, History } from 'lucide-react';
import { useAudioHover } from '../utils/useAudioHover';

export default function Timeline() {
  const playHoverSound = useAudioHover();
  const [activeNode, setActiveNode] = useState('simantap');
  const logRefs = useRef({});

  const timelineData = [
    {
      id: "digitak",
      time: "2026 - UNTIL NOW",
      role: "Backend Engineer Intern",
      company: "Digitak Labs Internship",
      desc: "Building and architecting backend systems for a food delivery application. Responsible for API development, database design, and GitLab-based CI/CD pipeline management.",
      tags: ["Backend", "Food Delivery", "API"],
      color: "outline-variant",
      hex: "#849495",
      icon: FlaskConical,
      pos: { top: "70%", left: "25%" },
      shadow: "none"
    },
    {
      id: "simantap",
      time: "14/05/2026",
      role: "SI MANTAP Dev Team",
      company: "SI MANTAP",
      desc: "Development of student guidance features for production-level university management application.",
      tags: ["Development", "Production"],
      color: "primary-container",
      hex: "#00f3ff",
      icon: Server,
      pos: { top: "30%", left: "75%" },
      active: true,
      shadow: "0 0 20px rgba(0,243,255,0.8)"
    }
  ];

  const handleNodeClick = (id) => {
    playHoverSound();
    setActiveNode(id);
    if (logRefs.current[id]) {
      logRefs.current[id].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <AnimatedPage>
      <header className="mb-8 border-b border-primary/20 pb-4">
        <h2 className="font-terminal text-2xl md:text-4xl text-cyber-cyan glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
          <TypewriterText text="> INITIATE_SERVICE_HISTORY_MAP" speed={30} />
        </h2>
        <p className="font-code text-on-surface-variant text-sm mt-2 opacity-80">
          Tracing node connections across operational timeline...
        </p>
      </header>
      
      <div className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[600px] gap-6 relative z-10">
        
        {/* LEFT: NETWORK MAP (60%) */}
        <div className="w-full lg:w-3/5 h-[400px] lg:h-full bg-surface-container-lowest/40 backdrop-blur-sm border border-outline-variant/50 chamfered p-4 relative flex flex-col group">
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#081010_120%),linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[length:100%_100%,40px_40px,40px_40px] pointer-events-none"></div>
          
          <div className="flex-1 relative w-full border border-outline-variant/30 bg-black/20 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <motion.line 
                stroke="#00f3ff" 
                strokeWidth="2" 
                x1="25%" y1="70%" 
                x2="75%" y2="30%" 
                strokeDasharray="10 10"
                className="opacity-40"
                animate={{ strokeDashoffset: [-20, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
            </svg>

            {/* Nodes */}
            {timelineData.map((node) => {
              const isSelected = activeNode === node.id;
              return (
                <motion.div 
                  key={node.id}
                  className="absolute cursor-pointer z-10"
                  style={{ top: node.pos.top, left: node.pos.left }}
                  initial={{ x: "-50%", y: "-50%" }}
                  whileHover={{ scale: 1.15, x: "-50%", y: "-50%" }}
                  onClick={() => handleNodeClick(node.id)}
                  onMouseEnter={playHoverSound}
                >
                  <div 
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative ${isSelected ? 'scale-110' : ''}`}
                    style={{ 
                      borderColor: node.hex, 
                      backgroundColor: isSelected ? `${node.hex}33` : '#131315',
                      boxShadow: isSelected || node.active ? node.shadow : 'none'
                    }}
                  >
                    <node.icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: node.hex }} />
                    
                    {/* Pulse effect if active */}
                    {node.active && (
                      <motion.div 
                        className="absolute inset-0 rounded-full border border-primary-container"
                        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                  </div>
                  
                  {/* Node Label */}
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap font-code text-[10px] md:text-xs bg-surface/90 px-2 py-1 border border-outline-variant/50 backdrop-blur-md"
                       style={{ color: isSelected ? node.hex : '#b9cacb' }}>
                    NODE: {node.company.toUpperCase()}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: TACTICAL TIMELINE LOG (40%) */}
        <div className="w-full lg:w-2/5 h-full bg-surface-container-lowest/60 backdrop-blur-md border border-outline-variant/50 chamfered p-6 overflow-y-auto custom-scrollbar relative">
          <div className="sticky top-0 bg-surface-container-lowest/90 pb-4 mb-6 border-b border-outline-variant/30 z-20 backdrop-blur-md">
            <h2 className="font-pixel text-xl text-primary-container tracking-widest flex items-center gap-2">
              <History className="w-5 h-5" />
              TACTICAL_TIMELINE.log
            </h2>
          </div>
          
          <div className="space-y-6 pl-4 border-l-2 border-outline-variant/30 relative">
            {/* Reverse array to show newest at top */}
            {[...timelineData].reverse().map((log) => {
              const isSelected = activeNode === log.id;
              return (
                <div 
                  key={log.id}
                  ref={el => logRefs.current[log.id] = el}
                  className={`relative transition-all duration-500 border border-transparent p-4 -ml-[18px] pl-6 rounded-r-lg group cursor-pointer ${
                    isSelected ? 'bg-primary-container/10 border-l-4' : 'hover:bg-surface-variant/10'
                  }`}
                  style={{ borderLeftColor: isSelected ? log.hex : 'transparent' }}
                  onClick={() => handleNodeClick(log.id)}
                >
                  {/* Indicator Dot */}
                  <div 
                    className="absolute w-3 h-3 rounded-full -left-[8px] top-6 transition-all duration-300"
                    style={{ 
                      backgroundColor: log.hex,
                      boxShadow: isSelected ? log.shadow : 'none',
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                  
                  {/* Time & Status */}
                  <div className="font-code text-xs mb-1 tracking-widest" style={{ color: log.hex }}>
                    {isSelected ? <TypewriterText text={log.time} speed={50} /> : log.time}
                  </div>
                  
                  {/* Role */}
                  <h3 className={`font-display text-lg font-bold transition-colors ${isSelected ? 'text-white' : 'text-on-surface'}`}>
                    {log.role}
                  </h3>
                  
                  {/* Company */}
                  <div className="font-code text-xs text-on-surface-variant mb-3 opacity-80">
                    {log.company}
                  </div>
                  
                  {/* Description */}
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                    {log.desc}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {log.tags.map(tag => (
                      <span key={tag} className="font-code text-[10px] border border-outline-variant/50 px-2 py-1 text-on-surface-variant bg-surface-variant/20 chamfered">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </AnimatedPage>
  );
}
