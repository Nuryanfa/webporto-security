import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';
import GlitchBlur from '../components/GlitchBlur';
import profileImg from '../../../WhatsApp Image 2024-10-01 at 14.09.45_9642c528.jpg';

export default function Home() {
  return (
    <AnimatedPage>
      <header className="mb-12 h-32">
        <div className="font-terminal text-cyber-cyan text-4xl md:text-6xl mb-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.6)] font-bold">
          <TypewriterText text="> INIT_SYS_SEQ..." speed={60} /><br/>
          <TypewriterText text="> HELLO, WORLD. I AM MUHAMAD NUR YANFA." delay={1200} speed={40} />
        </div>
        <div className="font-code text-lg text-elec-yellow mt-4 opacity-90 flex items-center gap-2">
          [SYS_STATUS]: BLUE_TEAM_ACTIVE <span className="w-3 h-5 bg-elec-yellow inline-block cursor-blink"></span>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Module 1: Physical ID Card */}
        <div className="md:col-span-4 flex">
          <div className="tactical-panel w-full p-0 flex flex-col relative overflow-hidden group">
            {/* Hologram Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 via-transparent to-elec-yellow/10 mix-blend-overlay z-10 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card Header */}
            <div className="bg-cyber-cyan/10 p-4 border-b border-cyber-cyan/30 flex justify-between items-center">
              <div>
                <p className="font-pixel text-[10px] text-cyber-cyan tracking-[0.2em]">DEPT. OF CYBER SECURITY</p>
                <p className="font-terminal text-sm text-white font-bold tracking-widest">OPERATIVE ID</p>
              </div>
              <div className="w-8 h-8 rounded bg-cyber-cyan/20 border border-cyber-cyan/50 flex items-center justify-center">
                <div className="w-4 h-4 bg-cyber-cyan animate-pulse"></div>
              </div>
            </div>

            {/* Photo Section */}
            <div className="p-6 pb-2 flex flex-col items-center">
              <div className="relative w-48 h-48 border-2 border-cyber-cyan/50 p-1 mb-4 chamfered">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-cyber-cyan shadow-[0_0_15px_#00f3ff] z-20 radar-sweep"></div>
                <img src={profileImg} alt="Muhamad Nur Yanfa" className="w-full h-full object-cover filter grayscale sepia-[0.2] hue-rotate-[180deg] brightness-75 group-hover:filter-none transition-all duration-500" />
              </div>
              
              <h2 className="font-pixel text-2xl font-bold text-white text-center glitch-hover">YANFA, M. N.</h2>
              <p className="font-terminal text-elec-yellow tracking-widest text-sm mb-4">ID: 0x7A9B-42</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-cyber-cyan/20 mx-6 mb-6 border border-cyber-cyan/20">
              <div className="bg-background/90 p-2">
                <p className="font-pixel text-[10px] text-outline-variant">CLEARANCE</p>
                <p className="font-terminal text-error font-bold text-sm">LEVEL 9 (ROOT)</p>
              </div>
              <div className="bg-background/90 p-2">
                <p className="font-pixel text-[10px] text-outline-variant">STATUS</p>
                <p className="font-terminal text-cyber-cyan font-bold text-sm animate-pulse">ACTIVE OP</p>
              </div>
              <div className="bg-background/90 p-2">
                <p className="font-pixel text-[10px] text-outline-variant">CLASS</p>
                <p className="font-terminal text-white text-xs">BACKEND ENG.</p>
              </div>
              <div className="bg-background/90 p-2">
                <p className="font-pixel text-[10px] text-outline-variant">BASE</p>
                <p className="font-terminal text-white text-xs">IDN // REGION 07</p>
              </div>
            </div>

            {/* Barcode Footer */}
            <div className="mt-auto bg-black/40 p-4 border-t border-cyber-cyan/20 flex flex-col items-center justify-center relative z-20">
              {/* Fake Barcode using CSS borders */}
              <div className="flex h-8 w-full justify-center items-end gap-1 opacity-70 mb-2">
                <div className="w-1 h-full bg-cyber-cyan"></div>
                <div className="w-2 h-full bg-cyber-cyan"></div>
                <div className="w-1 h-full bg-cyber-cyan"></div>
                <div className="w-3 h-full bg-cyber-cyan"></div>
                <div className="w-1 h-full bg-cyber-cyan"></div>
                <div className="w-2 h-full bg-cyber-cyan"></div>
                <div className="w-4 h-full bg-cyber-cyan"></div>
                <div className="w-1 h-full bg-cyber-cyan"></div>
                <div className="w-2 h-full bg-cyber-cyan"></div>
                <div className="w-1 h-full bg-cyber-cyan"></div>
                <div className="w-3 h-full bg-cyber-cyan"></div>
              </div>
              <p className="font-code text-[10px] tracking-[0.3em] text-outline-variant">88392-AX-993-2100</p>
            </div>
          </div>
        </div>
        
        {/* Right Side Modules (Col 5-12) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          
          {/* Module 2: Expanded Dossier Terminal */}
          <div className="tactical-panel p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-6 border-b border-cyber-cyan/20 pb-2">
              <h3 className="font-pixel text-2xl font-bold text-primary-container glitch-rgb flex items-center gap-2">
                <span className="w-3 h-3 bg-cyber-cyan inline-block"></span>
                DECRYPTED_DOSSIER.log
              </h3>
            </div>
            <GlitchBlur intensity="light">
              <div className="font-code text-on-surface-variant text-sm leading-relaxed space-y-4">
                <p className="text-cyber-cyan">
                  <TypewriterText text="> INITIATING BIO-SCAN... MATCH FOUND." speed={20} />
                </p>
                <p>
                  <TypewriterText text="I am a Backend & Security Engineer with a strong passion for building secure, scalable infrastructure. I specialize in identifying vulnerabilities, fortifying server architectures, and ensuring data integrity across complex web environments." delay={1000} speed={10} />
                </p>
                <p>
                  <TypewriterText text="My approach bridges the gap between software engineering and cybersecurity. By implementing secure-by-design principles, I aim to protect systems from emerging threats while maintaining optimal performance and reliability for end-users." delay={3000} speed={10} />
                </p>
                <p className="text-outline-variant mt-4">
                  <TypewriterText text="[ END OF LOG ]" delay={5000} speed={30} />
                </p>
              </div>
            </GlitchBlur>
          </div>

          {/* Bottom Row Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Module 3: Current Focus */}
            <div className="tactical-panel p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-pixel text-lg text-elec-yellow">CURRENT_FOCUS</h4>
                <div className="w-2 h-2 rounded-full bg-elec-yellow animate-ping"></div>
              </div>
              <ul className="space-y-3 font-body-md text-sm text-on-surface-variant">
                <li className="flex gap-3">
                  <span className="text-elec-yellow">01_</span>
                  <div>
                    <p className="text-white">Secure Backend Dev</p>
                    <p className="text-xs text-outline-variant">Building resilient and fast APIs using Go.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-elec-yellow">02_</span>
                  <div>
                    <p className="text-white">Infrastructure Security</p>
                    <p className="text-xs text-outline-variant">Implementing zero-trust and server hardening.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="text-elec-yellow">03_</span>
                  <div>
                    <p className="text-white">Vulnerability Research</p>
                    <p className="text-xs text-outline-variant">Analyzing and mitigating web application threats.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Module 4: Core Skills */}
            <div className="tactical-panel p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-pixel text-lg text-cyber-cyan">CORE_SKILLS</h4>
                <span className="font-code text-[10px] border border-cyber-cyan text-cyber-cyan px-1">VERIFIED</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-cyber-cyan/10 border border-cyber-cyan/30 px-3 py-2 chamfered group hover:bg-cyber-cyan/20 transition-colors">
                  <div className="w-2 h-2 bg-cyber-cyan group-hover:shadow-[0_0_8px_#00f3ff]"></div>
                  <span className="font-code text-xs text-white tracking-widest">GO</span>
                </div>
                <div className="flex items-center gap-2 bg-elec-yellow/10 border border-elec-yellow/30 px-3 py-2 chamfered group hover:bg-elec-yellow/20 transition-colors">
                  <div className="w-2 h-2 bg-elec-yellow group-hover:shadow-[0_0_8px_#fcee0a]"></div>
                  <span className="font-code text-xs text-white tracking-widest">POSTGRES</span>
                </div>
                <div className="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-3 py-2 chamfered group hover:bg-secondary/20 transition-colors">
                  <div className="w-2 h-2 bg-secondary group-hover:shadow-[0_0_8px_var(--tw-colors-secondary)]"></div>
                  <span className="font-code text-xs text-white tracking-widest">SECURITY</span>
                </div>
                <div className="flex items-center gap-2 bg-[#777BB4]/10 border border-[#777BB4]/30 px-3 py-2 chamfered group hover:bg-[#777BB4]/20 transition-colors">
                  <div className="w-2 h-2 bg-[#777BB4] group-hover:shadow-[0_0_8px_#777BB4]"></div>
                  <span className="font-code text-xs text-white tracking-widest">PHP</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F7DF1E]/10 border border-[#F7DF1E]/30 px-3 py-2 chamfered group hover:bg-[#F7DF1E]/20 transition-colors">
                  <div className="w-2 h-2 bg-[#F7DF1E] group-hover:shadow-[0_0_8px_#F7DF1E]"></div>
                  <span className="font-code text-xs text-white tracking-widest">JS</span>
                </div>
                <div className="flex items-center gap-2 bg-[#3776AB]/10 border border-[#3776AB]/30 px-3 py-2 chamfered group hover:bg-[#3776AB]/20 transition-colors">
                  <div className="w-2 h-2 bg-[#3776AB] group-hover:shadow-[0_0_8px_#3776AB]"></div>
                  <span className="font-code text-xs text-white tracking-widest">PYTHON</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
