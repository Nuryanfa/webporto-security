import { motion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import MagneticLink from "../components/MagneticLink";
import ContentTransition from "../components/ContentTransition";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";
import OperationMap from "../components/OperationMap";
import EpisodeHeader from "../components/luxe/EpisodeHeader";
import { statusTone } from "../content/episodes";
import { trackSpotlight } from "../components/luxe/ProjectCard";
import useReducedMotion from "../utils/useMotionPreference";
import { projects } from "../content/projects";
import { playTacticalBlip } from "../utils/audioTelemetry";

function rememberedProject() {
  try {
    return sessionStorage.getItem("ny-project") || "AEGIS";
  } catch {
    return "AEGIS";
  }
}

export default function Archive() {
  const [params, setParams] = useSearchParams();
  const code = params.get("project") || rememberedProject();
  const active = projects.find((project) => project.code === code) || projects[0];
  const activeIndex = projects.indexOf(active);
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      sessionStorage.setItem("ny-project", active.code);
    } catch {}
  }, [active.code]);

  const selectProject = (project) => {
    playTacticalBlip(920, 0.035);
    setParams({ project: project.code }, { preventScrollReset: true });
  };

  const focusProject = (index) => {
    selectProject(projects[index]);
    document.getElementById(`tab-${projects[index].code}`)?.focus();
  };

  const keyboardSelect = (event, index) => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) next = (index + 1) % projects.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + projects.length) % projects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    focusProject(next);
  };

  // Vim-style J/K target switching
  useEffect(() => {
    const handleVimKeys = (e) => {
      const tag = document.activeElement?.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(tag) ||
        document.activeElement?.isContentEditable ||
        e.metaKey ||
        e.ctrlKey
      ) {
        return;
      }
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        focusProject((activeIndex + 1) % projects.length);
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        focusProject((activeIndex - 1 + projects.length) % projects.length);
      }
    };
    window.addEventListener("keydown", handleVimKeys);
    return () => window.removeEventListener("keydown", handleVimKeys);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const Icon = active.icon;

  return (
    <AnimatedPage>
      <div className="lx-page lx-ops">
        <EpisodeHeader
          eyebrow={`Target archive — ${projects.length} operations`}
          extra={
            <span className="lx-kbd-hint">
              <kbd>J</kbd>
              <kbd>K</kbd> to cycle targets
            </span>
          }
          lede={`${projects.length} builds across backend, security, DevOps, and product engineering. Select a target to inspect its scope, architecture stages, and source.`}
        >
          Operations <em>archive.</em>
        </EpisodeHeader>

        <section className="lx-ops__console">
          <div className="lx-ops__index" role="tablist" aria-label="Project selection" data-reveal>
            {projects.map((project, index) => {
              const selected = active.id === project.id;
              return (
                <button
                  id={`tab-${project.code}`}
                  aria-controls={`operation-dossier-${project.code}`}
                  key={project.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  onKeyDown={(event) => keyboardSelect(event, index)}
                  onClick={() => selectProject(project)}
                  className={`lx-ops__tab tone-${statusTone(project.status)} ${selected ? "is-active" : ""}`}
                >
                  {selected && (
                    <motion.span
                      className="lx-ops__tab-bg"
                      layoutId="lx-ops-selection"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="lx-ops__tab-idx">{String(index + 1).padStart(2, "0")}</span>
                  <span className="lx-ops__tab-title">
                    {project.title}
                    <small>{project.type}</small>
                  </span>
                  <i className="lx-ops__tab-dot" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <div className="lx-ops__stage">
            <ContentTransition id={active.id}>
              <article
                id={`operation-dossier-${active.code}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.code}`}
                className={`lx-dossier tone-${statusTone(active.status)}`}
              >
                <div className="lx-dossier__visual" aria-hidden="true" onPointerMove={trackSpotlight} data-stagger>
                  <i className="lx-card__grid" />
                  <i className="lx-card__scan" />
                  <span className="lx-reticle is-locked">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="lx-dossier__lock">
                    <DecodeText text={`TARGET LOCKED // ${active.code}`} />
                  </span>
                  <span className="lx-dossier__code">{active.code}</span>
                  <Icon className="lx-dossier__icon" size={88} strokeWidth={0.8} />
                  <span className="lx-dossier__counter">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="lx-dossier__meta" data-stagger>
                  <span>{active.id}</span>
                  <span>{active.type}</span>
                  <span className="lx-status-chip">
                    <i />
                    {active.status}
                  </span>
                </div>

                <h2 className="lx-dossier__title" data-stagger>
                  {active.title}
                </h2>
                <p className="lx-dossier__summary" data-stagger>
                  {active.summary}
                </p>

                <blockquote className="lx-dossier__outcome" data-stagger>
                  <span>
                    <span lang="ja">作戦報告</span> Mission report
                  </span>
                  <p>{active.outcome}</p>
                </blockquote>

                <ul className="lx-tags" aria-label="Technologies" data-stagger>
                  {active.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <div data-stagger>
                  <OperationMap key={active.code} code={active.code} />
                </div>

                <div className="lx-dossier__actions" data-stagger>
                  <MagneticLink
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="lx-btn lx-btn--primary"
                  >
                    <Github size={18} />
                    <span>{active.code === "X509" ? "GitHub profile" : "Open repository"}</span>
                    <ArrowUpRight size={18} />
                  </MagneticLink>
                  <button
                    type="button"
                    className="lx-btn lx-btn--ghost"
                    onClick={() => focusProject((activeIndex + 1) % projects.length)}
                  >
                    <span>Next: {projects[(activeIndex + 1) % projects.length].title}</span>
                  </button>
                </div>
              </article>
            </ContentTransition>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
