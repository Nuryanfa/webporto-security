import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { statusTone } from "../../content/episodes";

// Pointer position feeds CSS variables only; no React render per frame.
export function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

// Targeting scope: corner brackets close in on the icon, never over text.
export function Scope({ icon: Icon, size = 44, locked = false }) {
  return (
    <span className={`lx-scope ${locked ? "is-locked" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <span className="lx-scope__ring" />
      <Icon className="lx-scope__icon" size={size} strokeWidth={1.1} />
    </span>
  );
}

export default function ProjectCard({ project, index }) {
  const tone = statusTone(project.status);
  return (
    <Link
      to={`/archive?project=${project.code}`}
      className={`lx-card tone-${tone}`}
      data-cursor="Lock on"
      onPointerMove={trackSpotlight}
    >
      <span className="lx-card__bar" aria-hidden="true">
        <span>{project.id}</span>
        <span>Target file</span>
        <span>{String(index + 1).padStart(2, "0")}/07</span>
      </span>
      <div className="lx-card__visual" aria-hidden="true">
        <i className="lx-card__grid" />
        <i className="lx-card__scan" />
        <span className="lx-card__id">
          <small>Codename</small>
          <span className="lx-card__code">{project.code}</span>
        </span>
        <Scope icon={project.icon} />
      </div>
      <div className="lx-card__body">
        <div className="lx-card__row">
          <span className="lx-card__type">{project.type}</span>
          <span className="lx-card__stamp">{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="lx-card__foot">
          <span className="lx-card__tags">{project.tags.slice(0, 3).join(" · ")}</span>
          <span className="lx-card__go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
      <i className="lx-card__hazard" aria-hidden="true" />
    </Link>
  );
}
