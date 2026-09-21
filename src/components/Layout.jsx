import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import ResonanceField from './ResonanceField';
import CyberCursor from './CyberCursor';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/archive' },
  { label: 'Experience', to: '/timeline' },
  { label: 'Contact', to: '/network' },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="min-h-screen bg-void text-on-surface selection:bg-resonance selection:text-void">
      <CyberCursor />
      <ResonanceField />
      <div className="fixed left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-resonance/80 to-transparent z-[60]" aria-hidden="true" />
      <motion.div className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-acid" style={{ scaleX }} aria-hidden="true" />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-void/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link to="/" className="group flex items-center gap-3" aria-label="Muhamad Nur Yanfa — Home">
            <span className="relative grid h-9 w-9 place-items-center border border-resonance/40 text-xs font-code text-resonance chamfer-sm">NY<span className="absolute -right-1 -top-1 h-2 w-2 bg-acid transition-transform group-hover:scale-125" /></span>
            <span><strong className="block font-display text-sm tracking-[0.08em]">MUHAMAD NUR YANFA</strong><span className="block font-code text-[10px] tracking-[0.18em] text-muted">SECURITY × BACKEND</span></span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {links.map((item, index) => <NavLink key={item.to} to={item.to} className={({ isActive }) => `group relative px-4 py-3 font-code text-xs uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-resonance' : 'text-muted hover:text-white'}`}><span className="mr-2 text-[9px] opacity-50">0{index + 1}</span>{item.label}<span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-resonance transition-transform group-hover:scale-x-100" /></NavLink>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" /><span className="font-code text-[10px] uppercase tracking-[0.16em] text-muted">Open to opportunities · ID</span></div>
          <button className="grid h-11 w-11 place-items-center border border-white/10 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation" aria-expanded={open}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {open && <nav className="border-t border-white/[0.07] bg-void px-5 py-4 md:hidden" aria-label="Mobile navigation">{links.map((item, index) => <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="flex border-b border-white/[0.06] py-4 font-display text-lg text-white"><span className="mr-4 font-code text-xs text-resonance">0{index + 1}</span>{item.label}</NavLink>)}</nav>}
      </header>
      <main className="relative z-10 mx-auto min-h-screen max-w-[1440px] px-5 pb-16 pt-28 md:px-10 md:pt-32">{children}</main>
      <div className="fixed bottom-6 left-6 z-20 hidden items-end gap-2 xl:flex" aria-hidden="true"><span className="hud-bar h-5" /><span className="hud-bar h-10" /><span className="hud-bar h-7" /><span className="ml-2 font-code text-[8px] tracking-[.2em] text-resonance/50 [writing-mode:vertical-rl]">RESONANCE_FEED</span></div>
      <footer className="relative z-10 border-t border-white/[0.07]"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 px-5 py-8 font-code text-[10px] uppercase tracking-[0.16em] text-muted md:flex-row md:px-10"><span>© {new Date().getFullYear()} Muhamad Nur Yanfa</span><span>Designed with restraint · Built with React</span></div></footer>
    </div>
  );
}
