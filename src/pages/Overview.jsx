import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Printer,
  ShieldCheck,
  Server,
  Layers,
  Terminal,
  ExternalLink,
  GitBranch,
  CheckCircle2,
} from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import MotionHeading from "../components/MotionHeading";
import DecodeText from "../components/DecodeText";
import { experiences } from "../content/experience";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import useReducedMotion from "../utils/useMotionPreference";

export default function Overview() {
  const reduced = useReducedMotion();

  const reveal = {
    initial: reduced ? false : { y: 16, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] },
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const handleKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || document.activeElement?.isContentEditable) return;
      if ((e.key === "p" || e.key === "P") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        handlePrint();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatedPage>
      <div className="overview-page max-w-[1100px] mx-auto py-8">
        {/* Executive Dossier Masthead */}
        <header className="overview-heading mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="eyebrow flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
              EXECUTIVE TECHNICAL BRIEF // REF: NY-07 // VERIFIED ENGINEERING DOSSIER
            </span>
            <div className="flex items-center gap-2 font-mono text-[9px] text-resonance/80">
              <span className="border border-resonance/30 px-2 py-0.5 rounded bg-resonance/[0.06]">
                STATUS: AVAILABLE FOR CONTRACT & HIRE
              </span>
            </div>
          </div>

          <MotionHeading>{profile.name}</MotionHeading>
          
          <p className="text-base md:text-lg text-muted/95 leading-relaxed mt-4 max-w-3xl">
            <strong className="text-white font-medium">{profile.role}.</strong> {profile.positioning}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/[0.08]">
            <Link className="ghost-button inline-flex items-center gap-2 px-4 py-2 border border-resonance/40 bg-resonance/[0.06] hover:bg-resonance/[0.15] text-resonance text-xs font-mono transition-colors" to="/">
              <ArrowRight size={14} />
              RETURN TO NEXUS HUB
            </Link>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-white/50 text-white/90 hover:text-white text-xs font-mono transition-colors rounded-[2px]"
              title="Print or Save PDF Dossier"
            >
              <Printer size={14} />
              PRINT / EXPORT DOSSIER
            </button>
            <span className="ml-auto font-mono text-[9px] text-muted hidden sm:inline">
              BANDUNG, ID [UTC+7] // ENCRYPTION: GPG_VERIFIED
            </span>
          </div>
        </header>

        {/* High-Signal Telemetry Bento Grid */}
        <motion.section {...reveal} className="mb-14" aria-label="Engineering Telemetry">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 border border-white/[0.09] bg-white/[0.02] rounded-[2px] relative overflow-hidden group holo-tilt hover:border-resonance/40 transition-colors">
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-br" />
              <span className="font-mono text-[9px] text-resonance tracking-wider block mb-1">
                SYSTEM PORTFOLIO
              </span>
              <strong className="text-2xl font-mono text-white block">07</strong>
              <small className="text-[11px] text-muted leading-tight block mt-1">
                Selected distributed builds & security labs
              </small>
            </div>

            <div className="p-4 border border-white/[0.09] bg-white/[0.02] rounded-[2px] relative overflow-hidden group holo-tilt hover:border-resonance/40 transition-colors">
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-br" />
              <span className="font-mono text-[9px] text-acid tracking-wider block mb-1">
                OPERATIONAL ROLES
              </span>
              <strong className="text-2xl font-mono text-white block">03</strong>
              <small className="text-[11px] text-muted leading-tight block mt-1">
                DevOps, Fullstack, and Backend contexts
              </small>
            </div>

            <div className="p-4 border border-white/[0.09] bg-white/[0.02] rounded-[2px] relative overflow-hidden group holo-tilt hover:border-resonance/40 transition-colors">
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-br" />
              <span className="font-mono text-[9px] text-resonance tracking-wider block mb-1">
                CORE STACK
              </span>
              <strong className="text-xl font-mono text-white block">GO × LINUX</strong>
              <small className="text-[11px] text-muted leading-tight block mt-1">
                Docker · PostgreSQL · Redis · gRPC
              </small>
            </div>

            <div className="p-4 border border-white/[0.09] bg-white/[0.02] rounded-[2px] relative overflow-hidden group holo-tilt hover:border-resonance/40 transition-colors">
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-br" />
              <span className="font-mono text-[9px] text-[#ff8080] tracking-wider block mb-1">
                DEFENSE ARCHITECTURE
              </span>
              <strong className="text-xl font-mono text-white block">DEVSECOPS</strong>
              <small className="text-[11px] text-muted leading-tight block mt-1">
                Wazuh SIEM · Suricata · MITRE ATT&CK
              </small>
            </div>
          </div>
        </motion.section>

        {/* 3 Core Competency Pillars */}
        <motion.section {...reveal} className="mb-14" aria-labelledby="overview-pillars">
          <div className="overview-section-label mb-6">
            <span>01</span>
            <h2 id="overview-pillars">Core Engineering Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <div className="p-5 border border-white/[0.08] bg-white/[0.015] rounded-[2px] flex flex-col justify-between holo-tilt">
              <div>
                <div className="flex items-center gap-2 text-resonance mb-3">
                  <Server size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-wider">Pillar 01 // Backend & Distributed</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Resilient Systems & APIs</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  Designing Go microservices with bounded request concurrency, gRPC control planes, Redis token-bucket rate limiting, and durable transactional job state machines.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[9px] text-resonance/90">
                PROVEN IN: AEGISGATE (V0.8), TASKFORGE (V0.1)
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 border border-white/[0.08] bg-white/[0.015] rounded-[2px] flex flex-col justify-between holo-tilt">
              <div>
                <div className="flex items-center gap-2 text-acid mb-3">
                  <ShieldCheck size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-wider">Pillar 02 // Application & Network Sec</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Defensive Security & Threat Ops</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  Constructing Zero-Trust network segmentation with MikroTik VLANs, signature-based IDS rule tuning with Suricata, SIEM event correlation in Wazuh, and MITRE ATT&CK threat mapping.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[9px] text-acid/90">
                PROVEN IN: SECURENET ENTERPRISE LAB, X.509
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 border border-white/[0.08] bg-white/[0.015] rounded-[2px] flex flex-col justify-between holo-tilt">
              <div>
                <div className="flex items-center gap-2 text-[#8ab9ff] mb-3">
                  <Layers size={18} />
                  <span className="font-mono text-[10px] uppercase tracking-wider">Pillar 03 // DevOps & Infrastructure</span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Reliable Software Delivery</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  Production server deployment, container orchestration via Docker, automated CI/CD pipeline authoring, and telemetry observability using OpenTelemetry and Prometheus.
                </p>
              </div>
              <div className="pt-3 border-t border-white/[0.06] font-mono text-[9px] text-[#8ab9ff]/90">
                PROVEN IN: NUANSA TEKNOLOGI INDONESIA (CURRENT)
              </div>
            </div>
          </div>
        </motion.section>

        {/* Selected Engineering Builds */}
        <motion.section {...reveal} className="mb-14" aria-labelledby="overview-work">
          <div className="overview-section-label mb-6">
            <span>02</span>
            <h2 id="overview-work">Selected Engineering Builds</h2>
          </div>

          <div className="space-y-4">
            {projects.map((project, index) => (
              <article
                key={project.id}
                className="p-5 border border-white/[0.08] bg-white/[0.015] hover:border-resonance/40 transition-colors rounded-[2px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] text-muted mb-2">
                    <span className="text-resonance font-medium">0{index + 1} // {project.code}</span>
                    <span>·</span>
                    <span className="text-white/70">{project.type}</span>
                    <span>·</span>
                    <span className="border border-white/10 px-1.5 py-0.2 rounded" style={{ color: project.color }}>
                      ● {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-white tracking-tight mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs md:text-sm text-muted leading-relaxed mb-3">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span className="tech-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.06]">
                  <Link
                    to={`/archive?project=${project.code}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-resonance/40 bg-resonance/[0.05] hover:bg-resonance/[0.15] text-resonance font-mono text-xs rounded-[2px] transition-colors whitespace-nowrap"
                    aria-label={`Explore schematic for ${project.title}`}
                  >
                    Inspect Schematic
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-4 text-right">
            <Link className="overview-all-work text-xs font-mono text-resonance hover:underline inline-flex items-center gap-1" to="/archive">
              View interactive matrix & schematic for all {projects.length} projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.section>

        {/* Experience Verification Trace */}
        <motion.section {...reveal} className="mb-14" aria-labelledby="overview-experience">
          <div className="overview-section-label mb-6">
            <span>03</span>
            <h2 id="overview-experience">Verified Experience Records</h2>
          </div>

          <div className="space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience.id}
                className="p-5 border border-white/[0.08] bg-white/[0.015] rounded-[2px]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-resonance">
                    {experience.coordinate} // {experience.id}
                  </span>
                  <span className="font-mono text-[9px] text-muted">
                    {experience.place}
                  </span>
                </div>

                <h3 className="text-lg font-medium text-white mb-2">
                  {experience.role}
                </h3>

                <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">
                  {experience.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-white/[0.06]">
                  {experience.events.map(({ icon: Icon, text }, i) => (
                    <div key={text} className="flex items-center gap-2 text-xs text-on-surface-variant font-mono">
                      <CheckCircle2 size={13} className="text-resonance flex-shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <Link to="/timeline" className="text-xs font-mono text-resonance hover:underline inline-flex items-center gap-1">
              Follow oscilloscope signal trace <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.section>

        {/* Contact Array */}
        <motion.section {...reveal} aria-labelledby="overview-contact">
          <div className="overview-section-label mb-6">
            <span>04</span>
            <h2 id="overview-contact">Direct Relays & Contact</h2>
          </div>

          <div className="p-6 border border-white/[0.08] bg-white/[0.015] rounded-[2px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-1">
                Open for Engineering Collaborations & Roles
              </h3>
              <p className="text-xs text-muted max-w-lg">
                Available for backend engineering, security architecture, and DevOps infrastructure initiatives. Inquiries received via direct mail or professional networks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/network"
                className="px-4 py-2 border border-resonance/50 bg-resonance text-tactical-black font-mono font-medium text-xs rounded-[2px] hover:bg-resonance/90 transition-colors inline-flex items-center gap-1.5"
              >
                Open Frequency Array <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://github.com/Nuryanfa"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-white/20 hover:border-white/50 text-white font-mono text-xs rounded-[2px] transition-colors inline-flex items-center gap-1.5"
              >
                GitHub Profile <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatedPage>
  );
}
