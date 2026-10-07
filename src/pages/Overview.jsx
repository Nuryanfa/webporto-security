import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import MotionHeading from "../components/MotionHeading";
import useReducedMotion from "../utils/useMotionPreference";
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { projects } from '../content/projects';

export default function Overview() {
  const reduced = useReducedMotion();
  const reveal = { initial: reduced ? false : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 }, transition: { duration: reduced ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] } };
  return <AnimatedPage><div className="overview-page">
    <header className="overview-heading"><span className="eyebrow">Quick overview / The essentials</span><MotionHeading>Muhamad Nur Yanfa</MotionHeading><p>Backend &amp; security engineering. Secure APIs, resilient infrastructure, and practical defensive systems.</p><Link className="ghost-button" to="/">Return to nexus<ArrowRight size={16} /></Link></header>
    <motion.section {...reveal} aria-labelledby="overview-work"><div className="overview-section-label"><span>01</span><h2 id="overview-work">Selected work</h2></div>
      {projects.map(project => <article key={project.id}><div><span className="eyebrow">{project.type}</span><h3>{project.title}</h3><p>{project.summary}</p><div className="flex flex-wrap gap-2">{project.tags.map(tag => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div><Link to={`/archive?project=${project.code}`} aria-label={`Explore ${project.title}`}>Explore<ArrowUpRight size={18} /></Link></article>)}
    </motion.section>
    <motion.section {...reveal} aria-labelledby="overview-experience"><div className="overview-section-label"><span>02</span><h2 id="overview-experience">Experience</h2></div><article><div><h3>Backend Engineer Intern · Digitak Labs</h3><p>2026 — Present. API development, database design, and GitLab delivery workflows for a food delivery product.</p><h3>Development Team · SI MANTAP</h3><p>May 2026. Student guidance features for a university management application.</p></div><Link to="/timeline">View trace<ArrowUpRight size={18} /></Link></article></motion.section>
    <motion.section {...reveal} aria-labelledby="overview-contact"><div className="overview-section-label"><span>03</span><h2 id="overview-contact">Contact</h2></div><div className="overview-links"><Link to="/network">Open contact channels<ArrowUpRight size={18} /></Link><a href="https://github.com/Nuryanfa" target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={18} /></a></div></motion.section>
  </div></AnimatedPage>;
}
