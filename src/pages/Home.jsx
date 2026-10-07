import { useState } from "react";
import MagneticLink from "../components/MagneticLink";

import { ArrowUpRight, ShieldCheck, Braces, Route, Radio } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import NexusScene from "../components/NexusScene";
import { setPreferences } from "../utils/experiencePreferences";
import ContentTransition from "../components/ContentTransition";
import useReducedMotion from "../utils/useMotionPreference";
const nodes = [
  {
    id: "identity",
    label: "Identity",
    detail: "The developer",
    icon: ShieldCheck,
    title: "Muhamad Nur Yanfa",
    tag: "BACKEND × SECURITY",
    description:
      "I build secure backend systems and practical defensive infrastructure. Based in Bandung, Indonesia.",
    meta: "Go · PostgreSQL · Defensive security",
    to: "/overview",
    action: "About my work",
  },
  {
    id: "operations",
    label: "Operations",
    detail: "Selected projects",
    icon: Braces,
    title: "Systems with purpose.",
    tag: "SELECTED WORK",
    description:
      "Explore backend architecture, purple-team laboratories, and the decisions behind each project.",
    meta: "03 projects · Architecture to implementation",
    to: "/archive",
    action: "Explore projects",
  },
  {
    id: "trace",
    label: "Trace",
    detail: "Experience",
    icon: Route,
    title: "Learning in the field.",
    tag: "EXPERIENCE",
    description:
      "API development, relational data design, and collaborative delivery. A record of the work that shapes my engineering practice.",
    meta: "2026 · Engineering experience",
    to: "/timeline",
    action: "View experience",
  },
  {
    id: "channel",
    label: "Channel",
    detail: "Get in touch",
    icon: Radio,
    title: "Let’s connect.",
    tag: "CONTACT",
    description:
      "For backend and security opportunities, project collaborations, or a thoughtful technical conversation.",
    meta: "Bandung, Indonesia · UTC+7",
    to: "/network",
    action: "Open contact",
  },
];
export default function Home() {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const active = nodes[selected];
  return (
    <AnimatedPage>
      <section className="nexus-experience">
        <header className="experience-masthead">
          <div>
            <span className="eyebrow">THE PERSONAL NETWORK</span>
            <h1>
              Engineering, <span>with an edge.</span>
            </h1>
          </div>
          <div className="masthead-index">
            <span>PORTFOLIO</span>
            <b>
              2026<span> / 07</span>
            </b>
          </div>
        </header>
        <NexusScene nodes={nodes} selected={selected} onSelect={setSelected} />
        <section
          id="nexus-dossier"
          className="map-dossier"
          aria-label="Selected section"
        >
          <ContentTransition id={active.id}>
            <div className="map-dossier-grid">
              <div>
                <span className="chapter">
                  0{selected + 1}
                  <i />
                  {active.tag}
                </span>
                <h2>{active.title}</h2>
              </div>
              <div className="map-dossier-copy">
                <p>{active.description}</p>
                <div className="map-dossier-actions">
                  <MagneticLink className="nexus-cta" to={active.to}>
                    {active.action}
                    <ArrowUpRight size={16} />
                  </MagneticLink>
                  <span>{active.meta}</span>
                </div>
              </div>
            </div>
          </ContentTransition>
        </section>
        <div className="experience-colophon">
          <span>DESIGNED TO CONNECT. BUILT TO LAST.</span>
          <button
            onClick={() =>
              setPreferences({ motion: reduced ? "full" : "reduced" })
            }
            aria-pressed={!reduced}
          >
            <span
              className={!reduced ? "motion-light active" : "motion-light"}
            />
            Motion {reduced ? "off" : "on"}
          </button>
          <a
            href="https://github.com/Nuryanfa"
            target="_blank"
            rel="noreferrer"
          >
            Explore the source
            <ArrowUpRight size={13} />
          </a>
        </div>
      </section>
    </AnimatedPage>
  );
}
