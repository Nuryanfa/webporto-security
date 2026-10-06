import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { projects } from "../content/projects";
import ProjectCard from "../components/ProjectCard";
export default function Archive() {
  const [params] = useSearchParams();
  const active = projects.find((p) => p.code === params.get("project"));
  return (
    <div className="page-width interior">
      <header className="page-heading">
        <span className="eyebrow">01 / Work</span>
        <h1>
          Ideas put
          <br />
          <em>into practice.</em>
        </h1>
        <p>
          A selection of projects exploring backend architecture, defensive
          security, and software quality.
        </p>
      </header>
      {active ? (
        <section className="project-detail">
          <Link className="text-link" to="/archive">
            <ArrowLeft size={18} />
            All projects
          </Link>
          <div className="detail-layout">
            <ProjectCard project={active} index={projects.indexOf(active)} />
            <div>
              <span className="eyebrow">Project overview</span>
              <h2>{active.title}</h2>
              <p>{active.summary}</p>
              <h3>Focus & approach</h3>
              <p>{active.outcome}</p>
              {active.code === "X509" && (
                <p className="project-disclosure">
                  This is an architecture prototype. The link below opens my
                  GitHub profile; a dedicated public repository is not listed
                  yet.
                </p>
              )}
              <a
                className="button"
                href={active.href}
                target="_blank"
                rel="noreferrer"
              >
                {active.code === "X509"
                  ? "Visit GitHub profile"
                  : "Explore the repository"}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </section>
      ) : (
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      <div className="interior-end">
        <p>Interested in how I work?</p>
        <Link className="text-link" to="/network">
          Let’s start a conversation
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
