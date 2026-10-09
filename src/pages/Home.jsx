import { useState } from "react";
import { Link } from "react-router-dom";
import MagneticLink from "../components/MagneticLink";

import { ArrowUpRight, ShieldCheck, Braces, Route, Radio } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import NexusScene from "../components/NexusScene";
import ContentTransition from "../components/ContentTransition";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experiences } from "../content/experience";
const nodes = [
  {
    id: "identity",
    label: "Identity",
    detail: "The developer",
    icon: ShieldCheck,
    title: profile.name,
    tag: "BACKEND × SECURITY × DEVOPS",
    description: profile.positioning,
    meta: "Go · Security · DevOps",
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
      "Explore secure infrastructure, distributed systems, fullstack products, and the engineering decisions behind them.",
    meta: `${projects.length} projects · From foundations to released work`,
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
      "Follow my path through backend engineering, fullstack delivery, and my current DevOps role.",
    meta: `${experiences.length} roles · Backend to operations`,
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
      "For backend, security, and DevOps opportunities—or a thoughtful technical collaboration.",
    meta: "Bandung, Indonesia · UTC+7",
    to: "/network",
    action: "Open contact",
  },
];
export default function Home() {
  const [selected, setSelected] = useState(0);
  const active = nodes[selected];
  return (
    <AnimatedPage>
      <section className="nexus-experience">
        <header className="experience-masthead">
          <div>
            <span className="eyebrow">THE PERSONAL NETWORK</span>
            <h1>
              {profile.taglineLead} <span>{profile.taglineAccent}</span>
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
        <Link className="mobile-nexus-open" to={active.to}>
          Open {active.label}
          <ArrowUpRight size={16} />
        </Link>
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
