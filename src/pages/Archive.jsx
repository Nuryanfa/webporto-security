import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';
import DecryptText from '../components/DecryptText';
import { motion } from 'framer-motion';

export default function Archive() {
  const projects = [
    {
      id: "PRJ-001", sec: "SEC_LAB",
      title: "SecureNet Enterprise Lab",
      desc: "Purple team-focused enterprise network security lab — built, attacked, defended, and continuously hardened. Features 6 versioned releases with MITRE ATT&CK mapped attack simulations.",
      tags: [
        { name: "MikroTik", style: "bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-fixed-dim" },
        { name: "Wazuh", style: "bg-[#00d8ff]/10 border-[#00d8ff]/30 text-[#00d8ff]" },
        { name: "Suricata", style: "bg-error-container/20 border-error-container/50 text-error" },
        { name: "Purple Team", style: "bg-secondary-container/10 border-secondary-container/30 text-secondary-fixed-dim" }
      ],
      glow: "primary-container",
      link: "https://github.com/Nuryanfa/securenet-enterprise-lab"
    },
    {
      id: "PRJ-002", sec: "CLOUD",
      title: "Cloud-Native Certificate Validation System",
      desc: "A high-throughput microservice for X.509 certificate validation using zero-trust principles.",
      tags: [
        { name: "Go", style: "bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-fixed-dim" },
        { name: "PostgreSQL", style: "bg-surface-variant border-outline-variant/50 text-on-surface-variant" },
        { name: "Cloud KMS", style: "bg-secondary-container/10 border-secondary-container/30 text-secondary-fixed-dim" }
      ],
      glow: "[#fcee0a]",
      link: "https://github.com/Nuryanfa"
    },
    {
      id: "PRJ-003", sec: "SQA",
      title: "E-Commerce SQA",
      desc: "Software quality assurance implementation for e-commerce platform with secure transaction handling and testing pipelines.",
      tags: [
        { name: "Golang", style: "bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-fixed-dim" },
        { name: "SQA", style: "bg-[#00d8ff]/10 border-[#00d8ff]/30 text-[#00d8ff]" },
        { name: "Testing", style: "bg-surface-variant border-outline-variant/50 text-on-surface-variant" }
      ],
      glow: "primary-container",
      link: "https://github.com/Nuryanfa/e-commerse-sqa"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <AnimatedPage>
      <header className="mb-12 border-b border-primary/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative min-h-[120px]">
        <div>
          <h2 className="font-terminal text-3xl md:text-5xl text-primary-container glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
            <span className="text-tertiary-fixed-dim">&gt;</span>
            <TypewriterText text="QUERY_DATABASE: /root/archive/projects" speed={40} />
          </h2>
          <p className="font-code text-body-md text-on-surface-variant mt-3 uppercase tracking-widest opacity-80">
            <TypewriterText text={`Retrieving archived records... [${projects.length}] MATCHES FOUND`} delay={1500} speed={30} />
          </p>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {projects.map((proj) => (
          <motion.a 
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            key={proj.id} 
            variants={itemVariants}
            className={`card-scanner chamfered relative bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-outline-variant/30 p-6 flex flex-col min-h-[380px] group hover:border-${proj.glow}/60 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(0,243,255,0.15)] transition-all duration-500 z-10 overflow-hidden`}
          >
            {/* Glitch Top Line Sweep */}
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#00f3ff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out pointer-events-none`}></div>
            
            {/* HUD Corner Brackets */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>

            {/* Scan Grid Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNDMsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className={`absolute inset-0 bg-${proj.glow}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            <div className={`absolute top-4 right-4 font-terminal text-sm text-on-surface-variant/50 tracking-widest group-hover:text-${proj.glow}/70 transition-colors flex items-center gap-2`}>
              ID: {proj.id} // SEC: {proj.sec}
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-opacity"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            
            <div className="mb-6 relative z-10">
              <h3 className="font-pixel text-2xl text-primary-container mb-3 group-hover:text-primary transition-colors line-clamp-2 group-hover:glitch-rgb">
                <DecryptText text={proj.title} speed={30} maxIterations={5} />
              </h3>
              <p className="font-body-md text-on-surface-variant opacity-80 line-clamp-3">
                <DecryptText text={proj.desc} speed={20} maxIterations={8} />
              </p>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
              {proj.tags.map(tag => (
                <span key={tag.name} className={`font-pixel text-sm px-2 py-1 border rounded chamfered ${tag.style}`}>
                  {tag.name}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </AnimatedPage>
  );
}
