import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "../content/projects";
import ProjectCard from "../components/ProjectCard";
export default function Home() {
  return (
    <>
      <section className="hero page-width">
        <div className="hero-top">
          <span className="eyebrow">Independent portfolio / 2026</span>
          <span className="location">Bandung, Indonesia · UTC+7</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="intro">Hello, I’m Muhamad Nur Yanfa.</p>
            <h1>
              Behind every
              <br />
              good product,
              <br />
              <em>a solid system.</em>
            </h1>
            <p className="hero-description">
              I build backend systems and explore the security behind them.
              Thoughtful APIs, dependable infrastructure, and a habit of asking
              what could go wrong.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/archive">
                Explore my work
                <ArrowUpRight size={18} />
              </Link>
              <Link className="text-link" to="/network">
                Let’s talk
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <figure className="portrait">
            <div className="portrait-frame">
              <img
                src="/profile.webp"
                alt="Muhamad Nur Yanfa"
                fetchPriority="high"
              />
              <span className="portrait-note">The person behind the code.</span>
            </div>
            <figcaption>
              <span>MUHAMAD NUR YANFA</span>
              <span>Developer & lifelong learner</span>
            </figcaption>
          </figure>
        </div>
        <div className="hero-foot">
          <span>Backend development & security</span>
          <span>Go / PostgreSQL / Infrastructure</span>
          <a href="#selected-work">Scroll to discover ↓</a>
        </div>
      </section>
      <section id="selected-work" className="work-section page-width">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / Selected work</span>
            <h2>Built with intention.</h2>
          </div>
          <Link className="text-link" to="/archive">
            View all projects
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="about-section page-width">
        <span className="eyebrow">02 / A little about me</span>
        <div>
          <h2>
            Curious by nature.
            <br />
            <em>Methodical by practice.</em>
          </h2>
          <p>
            I’m an Informatics student based in Bandung, working at the
            intersection of backend development and security. I enjoy
            understanding how systems fit together—and making those connections
            more reliable.
          </p>
          <p>
            My projects bring that curiosity into practice, from defensive
            network labs to secure service architecture.
          </p>
          <Link className="text-link" to="/timeline">
            Explore my experience
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="focus-list">
          <span>What I focus on</span>
          {[
            "Backend & API development",
            "Database & system design",
            "Defensive security",
            "Delivery & infrastructure",
          ].map((text, i) => (
            <p key={text}>
              <small>0{i + 1}</small>
              {text}
            </p>
          ))}
        </div>
      </section>
      <section className="contact-banner page-width">
        <span className="eyebrow">Have something in mind?</span>
        <Link to="/network">
          Let’s build something
          <br />
          <em>worth building.</em>
          <ArrowUpRight />
        </Link>
        <p>
          For opportunities, collaborations, or a good technical conversation.
        </p>
      </section>
    </>
  );
}
