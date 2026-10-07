import { motion } from "framer-motion";
import MagneticLink from "../components/MagneticLink";
import MotionHeading from "../components/MotionHeading";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ContentTransition from "../components/ContentTransition";
import { ArrowUpRight, Github } from "lucide-react";
import useReducedMotion from "../utils/useMotionPreference";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";
import { projects } from "../content/projects";

function rememberedProject() {
  try {
    return sessionStorage.getItem("ny-project") || "SNET";
  } catch {
    return "SNET";
  }
}

export default function Archive() {
  const [params, setParams] = useSearchParams();
  const code = params.get("project") || rememberedProject();
  const active =
    projects.find((project) => project.code === code) || projects[0];
  const reduced = useReducedMotion();
  useEffect(() => {
    try {
      sessionStorage.setItem("ny-project", active.code);
    } catch {}
  }, [active.code]);
  const selectProject = (project) => setParams({ project: project.code });
  const keyboardSelect = (event, index) => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % projects.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + projects.length) % projects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectProject(projects[next]);
    document.getElementById(`tab-${projects[next].code}`)?.focus();
  };
  return (
    <AnimatedPage>
      <div className="operation-shell">
        <header className="operation-header">
          <div>
            <span className="eyebrow">17 / Operation matrix</span>
            <MotionHeading>
              SELECT
              <br />A TARGET.
            </MotionHeading>
          </div>
          <p>
            Select an operation to inspect its purpose and outcomes. Your last
            selection stays with you when you return.
          </p>
        </header>
        <section className="operation-console">
          <div
            className="operation-selector"
            role="tablist"
            aria-label="Project selection"
          >
            {projects.map((project, index) => (
              <button
                id={`tab-${project.code}`}
                aria-controls="operation-dossier"
                key={project.id}
                role="tab"
                aria-selected={active.id === project.id}
                tabIndex={active.id === project.id ? 0 : -1}
                onKeyDown={(event) => keyboardSelect(event, index)}
                onClick={() => selectProject(project)}
                className={`operation-tab ${active.id === project.id ? "is-active" : ""}`}
                style={{ "--signal": project.color }}
              >
                {active.id === project.id && (
                  <motion.span
                    className="project-selection-glow"
                    layoutId="project-selection"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 210, damping: 28 }
                    }
                    aria-hidden="true"
                  />
                )}
                <span className="operation-index">0{index + 1}</span>
                <project.icon size={18} />
                <span>
                  <b>{project.code}</b>
                  <small>{project.type}</small>
                </span>
                <i>{project.status}</i>
              </button>
            ))}
          </div>
          <div className="operation-viewport">
            <div className="target-reticle" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <ContentTransition id={active.id}>
              <article
                id="operation-dossier"
                role="tabpanel"
                aria-labelledby={`tab-${active.code}`}
                className="operation-dossier"
              >
                <div className="dossier-top">
                  <span>
                    {active.id} / {active.type}
                  </span>
                  <span style={{ color: active.color }}>● {active.status}</span>
                </div>
                <h2>
                  <DecodeText text={active.title} />
                </h2>
                <p className="dossier-summary">{active.summary}</p>
                <div className="dossier-outcome">
                  <span>MISSION OUTPUT</span>
                  <p>{active.outcome}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.tags.map((tag) => (
                    <span className="tech-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <MagneticLink
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="dossier-link"
                  >
                    <Github size={17} />
                    {active.code === "X509"
                      ? "GitHub profile"
                      : "Open repository"}
                    <ArrowUpRight size={16} />
                  </MagneticLink>
                </div>
              </article>
            </ContentTransition>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
