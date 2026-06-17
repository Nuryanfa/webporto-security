import { useState } from 'react';
import Sidebar from './Sidebar';
import MouseSpotlight from './MouseSpotlight';
import ParticleBackground from './ParticleBackground';
import ScanlineOverlay from './ScanlineOverlay';
import CircuitOverlay from './CircuitOverlay';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen relative">
      <ScanlineOverlay />
      <CircuitOverlay />
      <MouseSpotlight />
      <ParticleBackground />
      
      {/* Mobile Top Navigation */}
      <nav className="bg-background/80 backdrop-blur-xl docked full-width top-0 border-b border-outline-variant/30 flat no shadows flex justify-between items-center w-full px-4 py-4 z-40 fixed lg:hidden">
        <div className="font-headline-md text-headline-md font-bold tracking-tighter text-primary-container drop-shadow-[0_0_15px_rgba(0,220,230,0.4)]">
          <span className="text-secondary-fixed">N</span>EO_<span className="text-error">S</span>EC
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-on-surface hover:text-primary-container p-2 rounded hover:bg-surface-variant transition-colors border border-transparent hover:border-outline-variant chamfered"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </nav>

      {/* Desktop Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} p-4 md:p-8 relative z-10 w-full overflow-x-hidden pt-20 lg:pt-8 min-h-screen flex flex-col`}>
        <div className="max-w-6xl mx-auto w-full flex-grow flex flex-col">
          {children}
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-outline-variant/20 flex flex-col items-center justify-center opacity-60">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mb-4"></div>
          <p className="font-code text-xs text-on-surface-variant text-center uppercase tracking-widest">
            System Designation: PORTFOLIO_V2.0<br/>
            Security Clearance: LEVEL_1_GUEST
          </p>
        </footer>
      </main>
    </div>
  );
}
