import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import MotionHeading from "../components/MotionHeading";
import { experiences } from "../content/experience";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import useReducedMotion from "../utils/useMotionPreference";

export default function Overview() {
  const reduced = useReducedMotion();
  const reveal = {
    initial: reduced ? false : { y: 16 },
    whileInView: { y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <AnimatedPage>
      <div className="overview-page">
        <header className="overview-heading">
          <span className="eyebrow">Quick overview / The essentials</span>
          <MotionHeading>{profile.name}</MotionHeading>
          <p>{profile.role}. {profile.positioning}</p>
          <Link className="ghost-button" to="/">
            Return to nexus <ArrowRight size={16} />
          </Link>
        </header>

        <motion.section {...reveal} aria-labelledby="overview-work">
          <div className="overview-section-label">
            <span>01</span><h2 id="overview-work">Featured work</h2>
          </div>
          {projects.slice(0, 5).map((project) => (
            <article key={project.id}>
              <div>
                <span className="eyebrow">{project.type} / {project.status}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}
                </div>
              </div>
              <Link to={`/archive?project=${project.code}`} aria-label={`Explore ${project.title}`}>
                Explore <ArrowUpRight size={18} />
              </Link>
            </article>
          ))}
          <Link className="overview-all-work" to="/archive">
            View all {projects.length} projects <ArrowUpRight size={16} />
          </Link>
        </motion.section>

        <motion.section {...reveal} aria-labelledby="overview-experience">
          <div className="overview-section-label">
            <span>02</span><h2 id="overview-experience">Experience</h2>
          </div>
          <article>
            <div className="overview-experience-list">
              {experiences.map((experience) => (
                <div key={experience.id}>
                  <span className="eyebrow">{experience.coordinate}</span>
                  <h3>{experience.role} · {experience.place}</h3>
                  <p>{experience.description}</p>
                </div>
              ))}
            </div>
            <Link to="/timeline">View trace <ArrowUpRight size={18} /></Link>
          </article>
        </motion.section>

        <motion.section {...reveal} aria-labelledby="overview-contact">
          <div className="overview-section-label">
            <span>03</span><h2 id="overview-contact">Contact</h2>
          </div>
          <div className="overview-links">
            <Link to="/network">Open contact channels <ArrowUpRight size={18} /></Link>
            <a href="https://github.com/Nuryanfa" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={18} />
            </a>
          </div>
        </motion.section>
      </div>
    </AnimatedPage>
  );
}
