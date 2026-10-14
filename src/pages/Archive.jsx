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
import OperationMap from "../components/OperationMap";
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
  const active =
    projects.find((project) => project.code === code) || projects[0];
  const reduced = useReducedMotion();

  useEffect(() => {
    try {
      sessionStorage.setItem("ny-project", active.code);
    } catch {}
  }, [active.code]);

  const selectProject = (project) => {
    playTacticalBlip(920, 0.035);
    setParams({ project: project.code });
  };

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

  // Vim-style J/K fast target switching
  useEffect(() => {
    const handleVimKeys = (e) => {
      const tag = document.activeElement?.tagName;
      if (
        ["INPUT", "TEXTAREA", "SELECT"].includes(tag) ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }
      const currIdx = projects.findIndex((p) => p.code === active.code);
      if (currIdx === -1) return;

      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        const next = (currIdx + 1) % projects.length;
        selectProject(projects[next]);
        document.getElementById(`tab-${projects[next].code}`)?.focus();
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        const prev = (currIdx - 1 + projects.length) % projects.length;
        selectProject(projects[prev]);
        document.getElementById(`tab-${projects[prev].code}`)?.focus();
      }
    };

    window.addEventListener("keydown", handleVimKeys);
    return () => window.removeEventListener("keydown", handleVimKeys);
  }, [active.code]);

  return (
    <AnimatedPage>
      <div className="operation-shell">
        <header className="operation-header">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <span className="eyebrow flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
                17 / Operation matrix // target acquisition
              </span>
              <span className="hidden sm:inline-block font-mono text-[9px] text-muted border border-white/10 px-2 py-0.5 rounded bg-white/[0.02]">
                KEYS: [J / K] CYCLE TARGETS
              </span>
            </div>
            <MotionHeading>
              SELECT
              <br />A TARGET.
            </MotionHeading>
          </div>
          <p>
            {projects.length} selected builds across backend, security, DevOps, and product
            engineering. Select one to inspect its current scope, schematic, and source.
          </p>
        </header>

        <p className="operation-mobile-hint">
          Swipe to browse all {projects.length} projects
        </p>

        <section className="operation-console">
          <div
            className="operation-selector"
            role="tablist"
            aria-label="Project selection"
          >
            {projects.map((project, index) => (
              <button
                id={`tab-${project.code}`}
                aria-controls={`operation-dossier-${project.code}`}
                key={project.id}
                role="tab"
                aria-selected={active.id === project.id}
                tabIndex={active.id === project.id ? 0 : -1}
                onKeyDown={(event) => keyboardSelect(event, index)}
                onClick={() => selectProject(project)}
                className={`operation-tab relative ${active.id === project.id ? "is-active" : ""}`}
                style={{ "--signal": project.color }}
              >
                {/* Tactical HUD Corner Brackets */}
                <span className="hud-corner hud-tl" aria-hidden="true" />
                <span className="hud-corner hud-tr" aria-hidden="true" />
                <span className="hud-corner hud-bl" aria-hidden="true" />
                <span className="hud-corner hud-br" aria-hidden="true" />

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

          <div className="operation-viewport relative">
            {/* Holographic Tactical Target Reticle */}
            <div className="target-reticle pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 400 400" className="w-full h-full opacity-30 text-resonance">
                <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" className="spin-slow" />
                <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="1.2" strokeDasharray="60 30" className="spin-slow-reverse" />
                <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
                <line x1="200" y1="15" x2="200" y2="85" stroke="currentColor" strokeWidth="1" />
                <line x1="200" y1="315" x2="200" y2="385" stroke="currentColor" strokeWidth="1" />
                <line x1="15" y1="200" x2="85" y2="200" stroke="currentColor" strokeWidth="1" />
                <line x1="315" y1="200" x2="385" y2="200" stroke="currentColor" strokeWidth="1" />
                <circle cx="200" cy="200" r="4" fill="currentColor" opacity="0.8" />
              </svg>
            </div>

            <ContentTransition id={active.id}>
              <article
                id={`operation-dossier-${active.code}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.code}`}
                className="operation-dossier relative"
                style={{ "--signal": active.color }}
              >
                {/* Dossier Corner Accents */}
                <span className="hud-corner hud-tl" aria-hidden="true" />
                <span className="hud-corner hud-tr" aria-hidden="true" />

                <div className="dossier-top flex items-center justify-between">
                  <span className="font-mono text-xs text-resonance/80">
                    TARGET // {active.id} // {active.type}
                  </span>
                  <span className="cyber-telemetry-badge" style={{ color: active.color, borderColor: `${active.color}44` }}>
                    <i style={{ backgroundColor: active.color, boxShadow: `0 0 8px ${active.color}` }} />
                    {active.status}
                  </span>
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

                <OperationMap key={active.code} code={active.code} />

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
