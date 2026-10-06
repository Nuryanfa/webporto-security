import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function ProjectCard({ project, index }) {
  return (
    <article className="project-card">
      <Link
        className={`project-art art-${project.code.toLowerCase()}`}
        to={`/archive?project=${project.code}`}
        aria-label={`View ${project.title}`}
      >
        <span className="art-caption">{project.type}</span>
        <div className="art-mark">
          {project.code === "SNET" ? (
            <>
              <span className="network-ring ring-one" />
              <span className="network-ring ring-two" />
              <span className="network-ring ring-three" />
              <b>
                S<span> / </span>N
              </b>
            </>
          ) : project.code === "X509" ? (
            <>
              <span className="certificate-line" />
              <b>X.509</b>
              <small>TRUST / VERIFY</small>
            </>
          ) : (
            <>
              <b>qa.</b>
              <span className="qa-check">✓</span>
            </>
          )}
        </div>
        <span className="art-bottom">
          {project.code}
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="project-meta">
        <span>
          0{index + 1} / {project.type}
        </span>
        <span>{project.status.toLowerCase()}</span>
      </div>
      <Link className="project-title" to={`/archive?project=${project.code}`}>
        <h3>{project.title}</h3>
        <ArrowUpRight size={22} />
      </Link>
      <p>{project.summary}</p>
      <div className="tags">
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}
