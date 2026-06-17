import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';

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
        {/* Identity Panel */}
        <div className="tactical-panel md:col-span-8 p-6 flex flex-col justify-between min-h-[300px]">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline-md text-2xl font-bold text-primary-container">IDENTITY_MATRIX</h3>
            <span className="font-code text-xs font-bold tracking-widest text-outline-variant">ID-001</span>
          </div>
          <div className="font-body-md text-on-surface-variant flex-grow">
            <p className="mb-4">&gt; Specialized in backend infrastructure fortification and cloud environment security.</p>
            <p>&gt; Designing resilient architectures capable of withstanding high-intensity cyber-tactical engagements.</p>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="px-2 py-1 bg-secondary-container/20 border border-secondary text-secondary-fixed-dim font-code text-xs font-bold tracking-widest">INFRA</span>
            <span className="px-2 py-1 bg-tertiary-container/20 border border-tertiary-container text-tertiary-container font-code text-xs font-bold tracking-widest">CLOUD_SEC</span>
          </div>
        </div>
        
        {/* Arsenal Panel */}
        <div className="tactical-panel md:col-span-4 p-6 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-headline-md text-2xl font-bold text-crimson-red">ARSENAL</h3>
            <span className="font-code text-xs font-bold tracking-widest text-outline-variant">ID-002</span>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center relative" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <div className="w-full h-full absolute inset-0 bg-cyber-cyan/10"></div>
              </div>
              <span className="font-code text-body-md text-cyber-cyan">Go</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-elec-yellow/20 border border-elec-yellow transform rotate-45 flex items-center justify-center relative"></div>
              <span className="font-code text-body-md text-elec-yellow">PostgreSQL</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary relative flex items-center justify-center">
                <div className="w-4 h-4 bg-secondary rounded-full absolute"></div>
              </div>
              <span className="font-code text-body-md text-secondary">Web Security</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
