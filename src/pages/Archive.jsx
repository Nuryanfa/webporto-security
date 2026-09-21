import { ArrowUpRight, Github } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

const projects = [
  { id: '01', type: 'Purple-team laboratory', title: 'SecureNet Enterprise Lab', summary: 'An enterprise network lab designed to be built, attacked, observed, and continuously hardened through six versioned releases.', outcome: 'Attack simulations mapped to MITRE ATT&CK with network visibility across Wazuh, Suricata, and MikroTik.', tags: ['MikroTik', 'Wazuh', 'Suricata', 'MITRE ATT&CK'], href: 'https://github.com/Nuryanfa/securenet-enterprise-lab', accent: 'text-resonance' },
  { id: '02', type: 'Backend architecture', title: 'Cloud-Native Certificate Validation', summary: 'A secure service concept for validating X.509 certificates with a zero-trust approach and scalable data flow.', outcome: 'Designed around explicit trust boundaries, managed keys, and auditable validation states.', tags: ['Go', 'PostgreSQL', 'Cloud KMS', 'X.509'], href: 'https://github.com/Nuryanfa', accent: 'text-acid' },
  { id: '03', type: 'Software quality', title: 'E-Commerce SQA', summary: 'Quality engineering for an e-commerce platform, covering secure transaction paths and repeatable test workflows.', outcome: 'A clearer testing strategy for critical commerce flows and safer delivery practices.', tags: ['Golang', 'SQA', 'Testing', 'CI/CD'], href: 'https://github.com/Nuryanfa/e-commerse-sqa', accent: 'text-threat' },
];

export default function Archive() {
  const reduceMotion = useReducedMotion();
  return <AnimatedPage><div>
    <header className="max-w-5xl pb-20 pt-8"><p className="font-code text-[10px] uppercase tracking-[.22em] text-resonance">02 / Selected operations</p><h1 className="mt-6 text-5xl font-semibold leading-[.95] tracking-[-.05em] text-white md:text-8xl">Work with<br />a defensive pulse.</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-muted">Selected backend and security work, focused on the decisions behind the system—not decorative dashboards.</p></header>
    <section className="border-t border-white/[.08]">
      {projects.map((project, index) => <motion.article key={project.id} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} whileHover={reduceMotion ? {} : { x: 8 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .08, duration: .55, ease: [0.16, 1, 0.3, 1] }} className="group grid gap-8 border-b border-white/[.08] py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-2"><span className={`font-code text-sm ${project.accent}`}>OP_{project.id}</span><p className="mt-3 font-code text-[9px] uppercase tracking-[.18em] text-muted">{project.type}</p></div>
        <div className="lg:col-span-6"><h2 className="text-3xl font-medium tracking-[-.03em] text-white transition-transform duration-300 group-hover:translate-x-2 md:text-5xl">{project.title}</h2><p className="mt-5 max-w-2xl leading-7 text-muted">{project.summary}</p><p className="mt-5 max-w-2xl border-l border-resonance/40 pl-4 text-sm leading-6 text-white/80">{project.outcome}</p></div>
        <div className="flex flex-col justify-between lg:col-span-4"><div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="tech-tag">{tag}</span>)}</div><a href={project.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 self-start text-sm text-white hover:text-resonance"><Github size={17} />Repository <ArrowUpRight size={16} /></a></div>
      </motion.article>)}
    </section>
  </div></AnimatedPage>;
}
