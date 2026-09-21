import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Activity, Braces, Database, GitBranch } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const signals = [
  { id: 'DIGITAK', coordinate: '2026.NOW', role: 'Backend Engineer Intern', place: 'Digitak Labs', description: 'Building backend systems for a food delivery product—from API development and relational data design to GitLab delivery workflows.', events: [{ icon: Braces, text: 'Backend feature development' }, { icon: Database, text: 'Relational database design' }, { icon: GitBranch, text: 'CI/CD workflow management' }], tags: ['Backend', 'API', 'GitLab CI/CD'] },
  { id: 'SIMANTAP', coordinate: '2026.05', role: 'Development Team', place: 'SI MANTAP', description: 'Contributed student guidance features to a production university management application with a collaborative delivery process.', events: [{ icon: Braces, text: 'Production feature delivery' }, { icon: Activity, text: 'Quality-focused iteration' }, { icon: GitBranch, text: 'Team implementation' }], tags: ['Development', 'Production', 'Collaboration'] },
];

export default function Timeline() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const signal = signals[active];
  return <AnimatedPage><div className="trace-shell">
    <header className="trace-title"><span className="eyebrow">29 / Signal trace</span><h1>FOLLOW THE<br />LIVE WIRE.</h1><p>Experience is not a static résumé here. It is a signal path: select a timestamp to inspect what moved through the system.</p></header>
    <div className="trace-console">
      <div className="trace-wave" aria-hidden="true"><svg viewBox="0 0 1000 140" preserveAspectRatio="none"><motion.path d="M0 70h110l24-12 24 24 24-60 28 101 28-88 28 49 26-14h140l25-18 28 39 30-68 30 98 32-83 27 46 29-14h142" fill="none" stroke="currentColor" strokeWidth="2" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8 }} /></svg></div>
      <div className="trace-axis" role="tablist" aria-label="Experience timeline">{signals.map((item, index) => <button role="tab" aria-selected={active === index} key={item.id} onClick={() => setActive(index)} className={active === index ? 'is-active' : ''}><span className="trace-dot" /><b>{item.coordinate}</b><small>{item.id}</small></button>)}</div>
      <AnimatePresence mode="wait"><motion.section key={signal.id} initial={reduced ? false : { opacity: 0, y: 25, clipPath: 'inset(0 0 100% 0)' }} animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }} exit={{ opacity: 0, y: -15 }} transition={{ duration: .5 }} className="trace-record"><div><span className="eyebrow">Decoded record / {signal.id}</span><h2>{signal.role}</h2><p className="trace-place">{signal.place}</p><p className="trace-copy">{signal.description}</p></div><div className="trace-events">{signal.events.map(({ icon: Icon, text }, i) => <motion.div key={text} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .18 + i * .1 }}><Icon size={17} /><span>{text}</span><b>0{i + 1}</b></motion.div>)}<div className="mt-5 flex flex-wrap gap-2">{signal.tags.map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div></motion.section></AnimatePresence>
    </div>
  </div></AnimatedPage>;
}
