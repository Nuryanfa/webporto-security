import { Link, useLocation } from 'react-router-dom';
import { Terminal, FolderOpen, History, Network, Power, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAudioHover } from '../utils/useAudioHover';
import MagneticWrapper from './MagneticWrapper';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar({ isOpen, toggle }) {
  const location = useLocation();
  const playHoverSound = useAudioHover();

  const navItems = [
    { name: 'Home', path: '/', icon: Terminal },
    { name: 'Archive', path: '/archive', icon: FolderOpen },
    { name: 'Timeline', path: '/timeline', icon: History },
    { name: 'Network', path: '/network', icon: Network },
  ];

  const handleDisconnect = () => {
    playHoverSound();
    document.body.innerHTML = `
      <style>
        * { cursor: crosshair !important; }
        .glitch-text { animation: glitch 1s linear infinite; }
        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }
      </style>
      <div style="height: 100vh; width: 100vw; background: black; display: flex; align-items: center; justify-content: center; flex-direction: column; color: red; font-family: monospace; z-index: 9999; position: fixed; top: 0; left: 0;">
        <h1 style="font-size: 3rem; margin-bottom: 2rem;" class="glitch-text">[ SYSTEM DISCONNECTED ]</h1>
        <button onclick="sessionStorage.setItem('rebooting', 'true'); window.location.reload();" style="color: #00f3ff; text-decoration: underline; background: none; border: none; font-size: 1.5rem; cursor: pointer;">> REBOOT_SYSTEM</button>
      </div>
    `;
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      className="bg-surface-container-lowest/90 backdrop-blur-2xl h-screen fixed left-0 top-0 border-r border-outline-variant/20 shadow-2xl hidden lg:flex flex-col py-6 z-30 pt-12"
    >
      <button 
        onClick={toggle}
        onMouseEnter={playHoverSound}
        className="absolute top-4 -right-3 w-6 h-10 bg-primary/20 hover:bg-primary/50 text-primary-fixed border border-primary/50 rounded-r-md flex items-center justify-center cursor-pointer transition-colors z-40"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className={`mb-8 border-b border-outline-variant/30 pb-6 px-6 flex items-center ${isOpen ? 'gap-4' : 'justify-center'} transition-all`}>
        <div className="w-12 h-12 rounded-none chamfered bg-surface-variant flex-shrink-0 flex items-center justify-center border border-outline-variant relative overflow-hidden group">
          <Terminal className="text-primary-fixed-dim w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
              <h1 className="font-display text-primary-container font-bold text-lg tracking-wider">USER:ROOT</h1>
              <p className="font-code text-[10px] tracking-wider text-secondary-fixed-dim mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
                STATUS: ENCRYPTED
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <nav className="flex flex-col gap-2 flex-grow px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <MagneticWrapper key={item.path}>
              <Link 
                to={item.path}
                onMouseEnter={playHoverSound}
                className={`flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 font-pixel text-lg transition-all rounded ${
                isActive 
                  ? 'bg-secondary-container/20 text-secondary-fixed-dim border-l-4 border-secondary font-bold drop-shadow-[0_0_10px_rgba(255,171,243,0.3)]' 
                  : 'text-on-surface-variant opacity-80 hover:bg-surface-variant/40 scale-105-on-hover hover:text-secondary-fixed'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="tracking-widest uppercase text-sm whitespace-nowrap overflow-hidden">
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              </Link>
            </MagneticWrapper>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-outline-variant/30 px-4">
        <MagneticWrapper>
          <button 
            onClick={handleDisconnect}
            onMouseEnter={playHoverSound}
            className={`flex items-center ${isOpen ? 'gap-3 justify-center' : 'justify-center'} w-full py-3 px-4 border border-error/30 text-error hover:bg-error/10 hover:shadow-[0_0_15px_rgba(255,0,60,0.3)] transition-all font-code text-sm tracking-widest uppercase chamfered group`}
          >
            <Power className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap overflow-hidden">
                  DISCONNECT
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </MagneticWrapper>
      </div>
    </motion.aside>
  );
}
