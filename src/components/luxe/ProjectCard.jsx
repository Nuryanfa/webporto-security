import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { statusTone } from "../../content/episodes";

// Signal strength 1–5 derived from project status.
function signalLevel(status = "") {
  const s = status.toLowerCase();
  if (s.includes("released") || s.includes("deployed")) return 5;
  if (s.includes("repository") || s.includes("development")) return 3;
  if (s.includes("prototype") || s.includes("foundation")) return 2;
  if (s.includes("archived")) return 1;
  return 3;
}

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
  const level = signalLevel(project.status);
  return (
    <Link to={`/archive?project=${project.code}`} className="lx-card" data-cursor="Lock on">
      <span className="lx-card__tab" aria-hidden="true">
        <span>
          {project.id} · Target file {String(index + 1).padStart(2, "0")}/07
        </span>
      </span>
      {/* CRT screen: halftone, scanlines, signal bars and the codename. */}
      <div className="lx-card__screen" aria-hidden="true">
        <span className="lx-card__telemetry">
          <span className="lx-card__telemetry-label">SIG</span>
          <span className="lx-card__telemetry-bars">
            {[1, 2, 3, 4, 5].map(i => (
              <span key={i} className={`lx-card__sig-seg${i <= level ? " is-lit" : ""}`} />
            ))}
          </span>
        </span>
        <span className="lx-card__code">{project.code}</span>
      </div>
      <div className="lx-card__body">
        <div className="lx-card__row">
          <span className="lx-card__type">{project.type}</span>
          <span className={`lx-card__sticker tone-${tone}`}>{project.status}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="lx-card__foot">
          <span className="lx-card__stack">{project.tags.slice(0, 3).join(" / ")}</span>
          <span className="lx-card__go" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
