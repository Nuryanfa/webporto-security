import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Pointer position feeds CSS variables only; no React render per frame.
export function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export default function ProjectCard({ project, index }) {
  const Icon = project.icon;
  return (
    <Link
      to={`/archive?project=${project.code}`}
      className="lx-card"
      style={{ "--c": project.color }}
      data-cursor="View"
      onPointerMove={trackSpotlight}
      aria-label={`${project.title} — ${project.type.toLowerCase()}, ${project.status.toLowerCase()}`}
    >
      <div className="lx-card__visual" aria-hidden="true">
        <i className="lx-card__grid" />
        <i className="lx-card__bloom" />
        <span className="lx-card__code">{project.code}</span>
        <Icon className="lx-card__icon" size={72} strokeWidth={0.9} />
      </div>
      <div className="lx-card__body">
        <div className="lx-card__meta">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{project.type}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="lx-card__foot">
          <span className="lx-status-chip">
            <i />
            {project.status}
          </span>
          <span className="lx-card__go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
