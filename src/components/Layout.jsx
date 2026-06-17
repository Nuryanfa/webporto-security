import Sidebar from './Sidebar';
import MouseSpotlight from './MouseSpotlight';
import ParticleBackground from './ParticleBackground';

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen relative">
      <MouseSpotlight />
      <ParticleBackground />
      
      {/* Mobile Top Navigation */}
      <nav className="bg-background/80 backdrop-blur-xl docked full-width top-0 border-b border-outline-variant/30 flat no shadows flex justify-between items-center w-full px-4 py-4 z-40 fixed lg:hidden">
        <div className="font-headline-md text-headline-md font-bold tracking-tighter text-primary-container drop-shadow-[0_0_15px_rgba(0,220,230,0.4)]">
            NEO_SEC//ROOT
        </div>
        <div className="flex items-center gap-4">
            <button className="font-code text-label-caps text-primary-fixed-dim border border-primary-fixed-dim px-4 py-1.5 btn-glitch hover:bg-primary-fixed-dim hover:text-tactical-black transition-colors">
                MENU
            </button>
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 md:px-16 lg:ml-64 max-w-[1440px] mx-auto min-h-screen w-full relative z-10 flex flex-col">
        {children}

        {/* Footer */}
        <footer className="bg-surface-container-lowest py-8 border-t border-outline-variant/10 flat mt-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="font-code text-label-caps text-tertiary-fixed-dim text-primary">
                  © 2026 // NEO_SEC PROTOCOL. ALL RIGHTS RESERVED.
              </div>
              <div className="flex gap-6 font-code text-label-caps">
                  <a className="text-on-surface-variant/50 hover:text-cyber-cyan transition-colors" href="https://github.com/nuryanfa">GITHUB</a>
                  <a className="text-on-surface-variant/50 hover:text-cyber-cyan transition-colors" href="https://linkedin.com/in/nuryanfa">LINKEDIN</a>
              </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
