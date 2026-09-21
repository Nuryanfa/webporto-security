import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Crosshair, Github, Shield, Workflow } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

const projects = [
  { id: 'OP-01', code: 'SNET', type: 'PURPLE TEAM', title: 'SecureNet Enterprise Lab', status: 'DEPLOYED', summary: 'An enterprise network laboratory designed to be built, attacked, observed, and continuously hardened.', outcome: 'Six versioned releases combining segmentation, detection engineering, and MITRE ATT&CK–mapped simulations.', tags: ['MikroTik', 'Wazuh', 'Suricata', 'MITRE ATT&CK'], href: 'https://github.com/Nuryanfa/securenet-enterprise-lab', icon: Shield, color: '#79e6df' },
  { id: 'OP-02', code: 'X509', type: 'BACKEND ARCHITECTURE', title: 'Certificate Validation System', status: 'PROTOTYPE', summary: 'A secure service concept for validating X.509 certificates with explicit trust boundaries and scalable data flow.', outcome: 'Architecture centered on managed keys, auditable validation states, and zero-trust decisions.', tags: ['Go', 'PostgreSQL', 'Cloud KMS', 'X.509'], href: 'https://github.com/Nuryanfa', icon: Workflow, color: '#e8f53b' },
  { id: 'OP-03', code: 'SQA', type: 'QUALITY ENGINEERING', title: 'E-Commerce SQA', status: 'ARCHIVED', summary: 'Quality engineering for an e-commerce platform covering secure transaction paths and repeatable test workflows.', outcome: 'A clearer test strategy for critical commerce flows and safer delivery practices.', tags: ['Golang', 'SQA', 'Testing', 'CI/CD'], href: 'https://github.com/Nuryanfa/e-commerse-sqa', icon: Crosshair, color: '#ff4d5e' },
];

export default function Archive() {
  const [active, setActive] = useState(projects[0]);
  const reduced = useReducedMotion();
  return <AnimatedPage><div className="operation-shell">
    <header className="operation-header"><div><span className="eyebrow">17 / Operation matrix</span><h1>SELECT<br />A TARGET.</h1></div><p>Each operation exposes its intent, engineering decisions, and outcome. Choose a frequency to decode the record.</p></header>
    <section className="operation-console">
      <div className="operation-selector" role="tablist" aria-label="Project selection">{projects.map((project, index) => <button id={`tab-${project.code}`} aria-controls="operation-dossier" key={project.id} role="tab" aria-selected={active.id === project.id} onClick={() => setActive(project)} onPointerEnter={() => setActive(project)} className={`operation-tab ${active.id === project.id ? 'is-active' : ''}`} style={{ '--signal': project.color }}><span className="operation-index">0{index + 1}</span><project.icon size={18} /><span><b>{project.code}</b><small>{project.type}</small></span><i>{project.status}</i></button>)}</div>
      <div className="operation-viewport">
        <div className="target-reticle" aria-hidden="true"><span /><span /><span /></div>
        <AnimatePresence mode="wait"><motion.article id="operation-dossier" role="tabpanel" aria-labelledby={`tab-${active.code}`} key={active.id} initial={reduced ? false : { opacity: 0, x: 35, filter: 'blur(10px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0)' }} exit={{ opacity: 0, x: -25, filter: 'blur(7px)' }} transition={{ duration: .42 }} className="operation-dossier">
          <div className="dossier-top"><span>{active.id} / {active.type}</span><span style={{ color: active.color }}>● {active.status}</span></div>
          <h2>{active.title}</h2><p className="dossier-summary">{active.summary}</p><div className="dossier-outcome"><span>MISSION OUTPUT</span><p>{active.outcome}</p></div>
          <div className="flex flex-wrap gap-2">{active.tags.map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
          <a href={active.href} target="_blank" rel="noreferrer" className="dossier-link"><Github size={17} />Open repository <ArrowUpRight size={16} /></a>
        </motion.article></AnimatePresence>
      </div>
    </section>
  </div></AnimatedPage>;
}
