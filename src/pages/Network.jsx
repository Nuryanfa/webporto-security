import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';
import { Code2, Briefcase } from 'lucide-react';
import { useAudioHover } from '../utils/useAudioHover';
import MagneticWrapper from '../components/MagneticWrapper';
import { motion } from 'framer-motion';

export default function Network() {
  const playHoverSound = useAudioHover();

  const nodes = [
    {
      icon: Code2, protocol: "GITHUB", desc: "Link to repositories.",
      href: "https://github.com/Nuryanfa", target: "_blank",
      glow: "elec-yellow", baseColor: "cyber-cyan"
    },
    {
      icon: Briefcase, protocol: "LINKEDIN", desc: "Link to professional network.",
      href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368", target: "_blank",
      glow: "elec-yellow", baseColor: "cyber-cyan"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <AnimatedPage>
      <header className="mb-12 border-b border-primary/20 pb-6 relative h-28">
        <h2 className="font-terminal text-3xl md:text-5xl text-cyber-cyan glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
          <TypewriterText text="> ESTABLISHING_SECURE_COMMS: /root/network" speed={40} />
        </h2>
        <p className="font-code text-body-md text-elec-yellow mt-3 tracking-widest opacity-90">
          <TypewriterText text="ENCRYPTION: AES-256 // STATUS: LISTENING..." delay={2000} speed={30} />
        </p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {nodes.map((node, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <MagneticWrapper>
              <a href={node.href} target={node.target} onMouseEnter={playHoverSound} className="network-node group block h-full">
                <div className={`absolute inset-0 bg-${node.baseColor}/5 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-${node.glow} opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#fcee0a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out`}></div>
                <node.icon className={`w-10 h-10 text-on-surface-variant group-hover:text-${node.glow} transition-colors mb-4`} />
                <h3 className="font-pixel text-xl font-bold tracking-widest text-white group-hover:text-primary transition-colors group-hover:glitch-rgb">[ PROTOCOL: {node.protocol} ]</h3>
                <p className="font-code text-sm text-on-surface-variant opacity-80 mt-1">{node.desc}</p>
              </a>
            </MagneticWrapper>
          </motion.div>
        ))}

      </motion.div>
    </AnimatedPage>
  );
}
