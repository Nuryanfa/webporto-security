import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Network, ShieldCheck, Radar, Database, KeyRound, FileCheck2, ShoppingBag, FlaskConical, GitBranch } from 'lucide-react';
import useReducedMotion from '../utils/useMotionPreference';

const systems = {
  SNET: [
    { id: 'network', title: 'Network boundary', tool: 'MikroTik', icon: Network, question: 'Where does traffic cross a trust boundary?', description: 'Explore the network and segmentation part of this lab. The repository is the source for its configuration and implementation.', focus: ['Network layout', 'Segmentation', 'Traffic policy'] },
    { id: 'inspection', title: 'Traffic inspection', tool: 'Suricata', icon: Radar, question: 'Which network activity should be investigated?', description: 'Inspect the detection layer and its place in the purple-team workflow. Review the project source for rules and attack scenarios.', focus: ['Network visibility', 'Detection rules', 'Attack simulations'] },
    { id: 'monitoring', title: 'Security monitoring', tool: 'Wazuh', icon: ShieldCheck, question: 'How can a defender understand a signal?', description: 'Explore security monitoring alongside the lab’s MITRE ATT&CK-mapped exercises. Evidence and configuration belong to the project repository.', focus: ['Security events', 'Investigation', 'Hardening'] },
  ],
  X509: [
    { id: 'request', title: 'Validation request', tool: 'Go', icon: FileCheck2, question: 'What must be verified before trusting a certificate?', description: 'A conceptual entry point for certificate validation requests. Detailed implementation and benchmarks are not published here yet.', focus: ['Input validation', 'Trust boundaries', 'Service design'] },
    { id: 'keys', title: 'Key boundary', tool: 'Cloud KMS', icon: KeyRound, question: 'Where should cryptographic trust live?', description: 'Explore managed keys as a design consideration in this service concept. This view illustrates areas of responsibility, not a verified deployment.', focus: ['Key management', 'Access policy', 'Zero trust'] },
    { id: 'records', title: 'Validation records', tool: 'PostgreSQL', icon: Database, question: 'What makes a decision auditable?', description: 'Review the role of validation state and persistence in the proposed design.', focus: ['Validation state', 'Persistence', 'Auditability'] },
  ],
  SQA: [
    { id: 'flows', title: 'Commerce flows', tool: 'Transactions', icon: ShoppingBag, question: 'Which user journeys carry the most risk?', description: 'Explore critical e-commerce paths as the starting point for quality assurance. The project repository contains the underlying work.', focus: ['User journeys', 'Transaction handling', 'Failure cases'] },
    { id: 'testing', title: 'Test strategy', tool: 'SQA', icon: FlaskConical, question: 'How can a change be checked repeatedly?', description: 'Inspect the testing part of the project, including repeatable checks around critical flows.', focus: ['Test coverage', 'Repeatability', 'Regression checks'] },
    { id: 'delivery', title: 'Delivery workflow', tool: 'CI/CD', icon: GitBranch, question: 'What should be checked before a release?', description: 'Explore the relationship between tests and delivery. Consult the source for the workflow actually implemented.', focus: ['Quality gates', 'Delivery checks', 'Release confidence'] },
  ],
};

export default function SystemExplorer({ project, onSelectLayer, layer }) {
  const reduced = useReducedMotion();
  const parts = systems[project.code];
  const selected = Math.max(0, parts.findIndex(part => part.id === layer));
  const active = parts[selected];
  const [guided, setGuided] = useState(false);
  useEffect(() => setGuided(false), [project.code]);
  const select = index => onSelectLayer(parts[index].id);

  return <section className="system-explorer" aria-labelledby="system-explorer-title">
    <header className="system-explorer-heading">
      <div><span className="eyebrow">Inside the operation / {project.code}</span><h2 id="system-explorer-title">Explore the system.</h2></div>
      <button className="explorer-tour" aria-pressed={guided} onClick={() => { setGuided(value => !value); select(0); }}>{guided ? 'End walkthrough' : 'Guided walkthrough'}<ArrowRight size={16} /></button>
    </header>
    <p className="explorer-caption">A simplified map of project themes. Select a layer to inspect its role; this is not a live network or a verified deployment diagram.</p>
    <div className="system-workspace">
      <div className="system-map" role="group" aria-label="System layers">
        {parts.map((part, index) => <div className="system-layer" key={part.id}>
          <button aria-pressed={selected === index} aria-controls="system-detail" onClick={() => select(index)} className={selected === index ? 'is-selected' : ''}>
            <span className="layer-number">0{index + 1}</span><part.icon size={25} aria-hidden="true" /><strong>{part.title}</strong><small>{part.tool}</small>
          </button>
          {index < parts.length - 1 && <span className="system-wire" aria-hidden="true"><i /></span>}
        </div>)}
      </div>
      <div id="system-detail" className="system-detail" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}><motion.article key={`${project.code}-${active.id}`} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}>
          <span className="eyebrow">Layer 0{selected + 1} / {active.tool}</span><h3>{active.question}</h3><p>{active.description}</p>
          <ul>{active.focus.map(item => <li key={item}>{item}</li>)}</ul>
        </motion.article></AnimatePresence>
      </div>
    </div>
    <div className="walkthrough-controls">
      <button onClick={() => select(selected - 1)} disabled={selected === 0}><ArrowLeft size={16} />Previous</button>
      <span>{guided ? 'Walkthrough' : 'Layer'} {selected + 1} / {parts.length}</span>
      <button onClick={() => select(selected + 1)} disabled={selected === parts.length - 1}>Next<ArrowRight size={16} /></button>
    </div>
  </section>;
}
