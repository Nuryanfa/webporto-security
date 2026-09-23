import { NavLink, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CircleDot, FolderKanban, Radio, Route, UserRound } from 'lucide-react';
import ResonanceField from './ResonanceField';
import CyberCursor from './CyberCursor';
import SignalLattice from './SignalLattice';

const coordinates = [
  { code: '00', label: 'Nexus', to: '/', icon: CircleDot },
  { code: '17', label: 'Operations', to: '/archive', icon: FolderKanban },
  { code: '29', label: 'Trace', to: '/timeline', icon: Route },
  { code: '41', label: 'Channel', to: '/network', icon: Radio },
];

export default function Layout({ children }) {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const current = coordinates.find(item => item.to === location.pathname) || coordinates[0];

  return <div className="min-h-screen bg-void text-on-surface selection:bg-resonance selection:text-void">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <CyberCursor /><ResonanceField /><SignalLattice />
    <motion.div className="fixed left-0 top-0 z-[70] h-[2px] w-full origin-left bg-acid" style={{ scaleX: progress }} />

    <aside className="fixed inset-y-0 left-0 z-40 hidden w-20 flex-col items-center border-r border-white/[.08] bg-void/75 py-6 backdrop-blur-xl md:flex">
      <NavLink to="/" className="grid h-10 w-10 place-items-center border border-resonance/40 font-code text-[10px] text-resonance chamfer-sm">NY</NavLink>
      <div className="my-auto flex flex-col gap-4">
        {coordinates.map(({ code, label, to, icon: Icon }) => <NavLink key={to} to={to} aria-label={label} title={label} className={({ isActive }) => `group relative grid h-11 w-11 place-items-center transition-all ${isActive ? 'bg-resonance text-void' : 'text-muted hover:bg-white/[.06] hover:text-white'}`}><Icon size={17} /><span className="absolute left-14 whitespace-nowrap border border-white/10 bg-void px-3 py-2 font-code text-[9px] uppercase tracking-[.18em] text-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">{code} / {label}</span></NavLink>)}
      </div>
      <span className="font-code text-[8px] tracking-[.25em] text-muted [writing-mode:vertical-rl]">SYSTEM // ONLINE</span>
    </aside>

    <div className="fixed left-20 right-0 top-0 z-30 hidden h-12 items-center justify-between border-b border-white/[.06] px-7 font-code text-[9px] uppercase tracking-[.2em] text-muted md:flex"><span>Coordinate / {current.code}.{current.label}</span><span className="flex items-center gap-3"><i className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_12px_#e8f53b]" />Connection stable · Jakarta</span></div>

    <main id="main-content" className="relative z-10 min-h-screen px-5 pb-28 pt-8 md:ml-20 md:px-10 md:pb-16 md:pt-20 xl:px-16">{children}</main>

    <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 border border-white/10 bg-void/90 p-1.5 backdrop-blur-xl md:hidden" aria-label="Primary navigation">{coordinates.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} aria-label={label} className={({ isActive }) => `flex min-h-12 flex-col items-center justify-center gap-1 font-code text-[8px] uppercase tracking-[.08em] ${isActive ? 'bg-resonance text-void' : 'text-muted'}`}><Icon size={16} /><span>{label}</span></NavLink>)}</nav>

    <div className="fixed bottom-6 right-7 z-20 hidden items-center gap-3 font-code text-[8px] uppercase tracking-[.2em] text-resonance/50 xl:flex"><span>Signal</span><span className="hud-bar h-4" /><span className="hud-bar h-7" /><span className="hud-bar h-5" /></div>
  </div>;
}
