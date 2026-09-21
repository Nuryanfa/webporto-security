import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Braces, Radio, Route, ShieldCheck } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import TiltPanel from '../components/TiltPanel';

const nodes = [
  { id: 'profile', index: '01', label: 'Identity', eyebrow: 'Backend × Security', title: 'Muhamad Nur Yanfa', description: 'I build secure backend systems and practical defensive infrastructure from Indonesia.', meta: 'Go · PostgreSQL · Security', icon: ShieldCheck, position: 'node-profile' },
  { id: 'work', index: '02', label: 'Operations', eyebrow: 'Selected work', title: 'Systems under pressure', description: 'Purple-team laboratories, secure backend services, and quality-focused delivery.', meta: '3 selected operations', icon: Braces, position: 'node-work', to: '/archive' },
  { id: 'experience', index: '03', label: 'Trace', eyebrow: 'Field history', title: 'Signals from the field', description: 'A concise record of production engineering, collaboration, and technical growth.', meta: '2026 — present', icon: Route, position: 'node-experience', to: '/timeline' },
  { id: 'contact', index: '04', label: 'Channel', eyebrow: 'Open connection', title: 'Start a transmission', description: 'Available for backend, security, and roles where both disciplines intersect.', meta: 'Response channel online', icon: Radio, position: 'node-contact', to: '/network' },
];

export default function Home() {
  const [active, setActive] = useState(nodes[0]);
  const reduced = useReducedMotion();
  return <AnimatedPage><div className="nexus-shell">
    <div className="nexus-kicker"><span>INTERFACE_07</span><span>Navigate the signal map</span></div>

    <section className="nexus-stage" aria-label="Interactive portfolio map">
      <svg className="nexus-lines" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M600 360 L220 145 M600 360 L980 155 M600 360 L1030 565 M600 360 L190 570" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 9" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .28 }} transition={{ duration: 1.6, delay: .35 }} /></svg>

      <div className="nexus-core" data-cursor="active" onPointerEnter={() => setActive(nodes[0])}>
        <TiltPanel className="relative h-full w-full overflow-hidden rounded-full border border-resonance/35 bg-[#11171a] shadow-[0_0_80px_rgba(121,230,223,.12)]"><img src="/profile.webp" alt="Portrait of Muhamad Nur Yanfa" width="960" height="960" fetchPriority="high" decoding="async" className="h-full w-full object-cover grayscale-[30%] contrast-110" /><div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-resonance/10" /><div className="scan-beam" /></TiltPanel>
        <motion.div className="core-orbit" animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}><span /><span /></motion.div>
        <span className="core-label">CORE / NY-07</span>
      </div>

      {nodes.slice(1).map((node, i) => <Node key={node.id} node={node} active={active.id === node.id} setActive={setActive} delay={.5 + i * .13} reduced={reduced} />)}

      <AnimatePresence mode="wait"><motion.div key={active.id} className="nexus-dossier" initial={reduced ? false : { opacity: 0, y: 16, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }} transition={{ duration: .35 }}>
        <div className="flex items-center justify-between"><span className="font-code text-[9px] uppercase tracking-[.2em] text-resonance">{active.eyebrow}</span><span className="font-code text-[9px] text-muted">0{active.index}</span></div>
        <h1 className="mt-4 text-4xl font-semibold leading-[.95] tracking-[-.05em] text-white md:text-6xl">{active.title}</h1>
        <p className="mt-5 max-w-lg leading-7 text-muted">{active.description}</p>
        <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4"><span className="font-code text-[9px] uppercase tracking-[.16em] text-muted">{active.meta}</span>{active.to ? <Link to={active.to} className="group flex items-center gap-2 font-code text-[10px] uppercase tracking-[.14em] text-acid">Enter node <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link> : <span className="font-code text-[9px] uppercase tracking-[.15em] text-resonance">Core synchronized</span>}</div>
      </motion.div></AnimatePresence>

      <div className="nexus-instruction"><span className="hidden md:inline">Hover a node to decode · Click to enter</span><span className="md:hidden">Tap a node to decode</span></div>
    </section>
  </div></AnimatedPage>;
}

function Node({ node, active, setActive, delay, reduced }) {
  const Icon = node.icon;
  return <motion.div className={`nexus-node ${node.position}`} initial={reduced ? false : { opacity: 0, scale: .5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay, type: 'spring', stiffness: 150 }}><button onPointerEnter={() => setActive(node)} onFocus={() => setActive(node)} onClick={() => setActive(node)} className={`node-trigger ${active ? 'is-active' : ''}`} aria-label={`Preview ${node.label}`} aria-pressed={active}><Icon size={18} /><span className="node-pulse" /></button><span className="node-caption"><b>{node.index}</b> {node.label}</span></motion.div>;
}
