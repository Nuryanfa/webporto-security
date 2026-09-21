import { ArrowRight, Github, ShieldCheck, Terminal, Waves } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import profileImg from '../assets/profile.jpg';
import AnimatedPage from '../components/AnimatedPage';
import TiltPanel from '../components/TiltPanel';

const expertise = [
  ['01', 'Secure backend', 'APIs, authentication, database design, and systems built with security as a foundation.'],
  ['02', 'Detection engineering', 'Practical monitoring, network visibility, and attack-informed defensive controls.'],
  ['03', 'Quality & delivery', 'Testing and CI/CD practices that keep releases stable, observable, and maintainable.'],
];

export default function Home() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } };
  return <AnimatedPage><div>
    <section className="grid min-h-[calc(100vh-8rem)] items-center gap-12 pb-20 lg:grid-cols-12 lg:gap-16">
      <motion.div {...enter} className="lg:col-span-7">
        <div className="mb-8 flex items-center gap-4 font-code text-[10px] uppercase tracking-[0.22em] text-resonance"><span className="h-px w-12 bg-resonance" />01 — Resonance active</div>
        <h1 data-text="I BUILD SYSTEMS THAT SURVIVE CONTACT." className="interactive-title max-w-4xl font-display text-[clamp(3.2rem,8vw,7.8rem)] font-semibold leading-[.84] tracking-[-0.065em] text-white">I BUILD SYSTEMS<br />THAT <span className="relative text-resonance">SURVIVE<span className="absolute -right-4 top-1 h-3 w-3 bg-acid md:-right-6" /></span><br />CONTACT.</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted md:text-xl">Backend and security engineer crafting reliable APIs, resilient infrastructure, and attack-informed defenses.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row"><Link to="/archive" className="signal-button group"><span>Explore selected work</span><ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></Link><a href="mailto:muhamadnuryanfa@gmail.com" className="ghost-button">Start a conversation</a></div>
        <div className="mt-14 grid max-w-2xl grid-cols-2 gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4">{[['BASE', 'Indonesia'], ['FOCUS', 'Backend + Security'], ['STACK', 'Go · PostgreSQL'], ['STATUS', 'Available']].map(([label, value]) => <div key={label} className="bg-void/90 p-4"><span className="block font-code text-[9px] tracking-[.2em] text-muted">{label}</span><strong className="mt-2 block text-xs font-medium text-white">{value}</strong></div>)}</div>
      </motion.div>
      <motion.div {...enter} transition={{ duration: .8, delay: .12 }} className="relative lg:col-span-5">
        <TiltPanel className="portrait-frame portrait-interactive relative mx-auto max-w-[470px] overflow-hidden border border-white/10 bg-[#101419]"><div className="absolute inset-x-0 top-0 z-20 flex justify-between p-4 font-code text-[9px] uppercase tracking-[.18em] text-resonance"><span>OPERATOR / NY-07</span><span>SYNC 98.4%</span></div><img src={profileImg} alt="Muhamad Nur Yanfa" className="aspect-[4/5] w-full object-cover object-center grayscale-[35%] contrast-110 transition duration-700 hover:scale-[1.035] hover:grayscale-0" /><div className="scan-beam" /><div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-resonance/5" /><div className="absolute bottom-0 left-0 right-0 p-5"><ResonanceWave /><div className="mt-3 flex items-center justify-between font-code text-[9px] uppercase tracking-[.18em] text-muted"><span>Signal integrity stable</span><span className="text-acid">● Online</span></div></div></TiltPanel>
      </motion.div>
    </section>
    <section className="section-shell"><SectionHeading index="02" eyebrow="Core capabilities" title="Engineering at the edge of reliability and defense." /><div className="mt-12 grid gap-px border-y border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">{expertise.map(([num, title, copy]) => <article key={num} className="group bg-void px-1 py-8 lg:px-8"><span className="font-code text-xs text-resonance">{num}</span><h3 className="mt-12 text-2xl font-medium text-white transition-colors group-hover:text-acid">{title}</h3><p className="mt-4 max-w-sm leading-7 text-muted">{copy}</p></article>)}</div></section>
    <section className="section-shell border-t border-white/[0.08]"><div className="grid items-end gap-10 lg:grid-cols-2"><SectionHeading index="03" eyebrow="Selected operation" title="SecureNet Enterprise Lab" /><div><p className="max-w-xl leading-7 text-muted">A purple-team enterprise security lab built to be attacked, observed, and hardened. Six versioned releases connect network segmentation, detection tooling, and MITRE ATT&CK–mapped simulations.</p><div className="mt-7 flex flex-wrap gap-2">{['MikroTik', 'Wazuh', 'Suricata', 'Purple Team'].map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}</div><a href="https://github.com/Nuryanfa/securenet-enterprise-lab" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-white hover:text-resonance"><Github size={17} />View repository <ArrowRight size={16} /></a></div></div><div className="mt-12 grid gap-4 md:grid-cols-3"><Metric icon={ShieldCheck} label="Approach" value="Purple team" /><Metric icon={Terminal} label="Delivery" value="6 releases" /><Metric icon={Waves} label="Framework" value="MITRE ATT&CK" /></div></section>
  </div></AnimatedPage>;
}

function ResonanceWave() { const reduced = useReducedMotion(); return <svg viewBox="0 0 500 54" className="w-full text-resonance" aria-hidden="true"><motion.path d="M0 28h65l10-5 12 12 12-26 14 39 13-30 14 12 14-3h55l9-6 10 15 12-28 15 40 13-35 14 18 12-3h57l9-8 12 17 13-25 14 31 14-20 14 5h60" fill="none" stroke="currentColor" strokeWidth="1.5" initial={reduced ? false : { pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1.8, delay: .55, ease: 'easeInOut' }} /><motion.path d="M0 28h500" stroke="currentColor" opacity=".15" animate={reduced ? {} : { opacity: [.08, .28, .08] }} transition={{ duration: 2.8, repeat: Infinity }} /></svg> }
function SectionHeading({ index, eyebrow, title }) { return <div><div className="font-code text-[10px] uppercase tracking-[.22em] text-resonance">{index} / {eyebrow}</div><h2 className="mt-5 max-w-3xl text-4xl font-medium leading-tight tracking-[-.035em] text-white md:text-6xl">{title}</h2></div> }
function Metric({ icon: Icon, label, value }) { return <div className="flex items-center gap-4 border border-white/[.08] bg-white/[.02] p-5"><Icon size={20} className="text-resonance" /><div><span className="block font-code text-[9px] uppercase tracking-[.18em] text-muted">{label}</span><strong className="mt-1 block text-sm text-white">{value}</strong></div></div> }
