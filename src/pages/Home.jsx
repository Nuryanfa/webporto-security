import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Braces, Route, Radio } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import IdentityScene from "../components/IdentityScene";
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
      <section className="nexus-v2">
        <div className="nexus-heading">
          <span className="eyebrow">PERSONAL INTERFACE / 07</span>
          <span>ENGINEERING WITH INTENT</span>
        </div>
        <div className="nexus-composition">
          <div className="nexus-copy">
            <div className="chapter">
              <span>0{selected + 1}</span>
              <i />
              {active.tag}
            </div>
            <ContentTransition id={active.id}>
              <h1>{active.title}</h1>
              <p>{active.description}</p>
              <Link className="nexus-cta" to={active.to}>
                {active.action}
                <ArrowUpRight size={17} />
              </Link>
              <div className="nexus-meta">{active.meta}</div>
            </ContentTransition>
          </div>
          <IdentityScene />
        </div>
        <nav
          className="nexus-selectors"
          aria-label="Explore portfolio sections"
        >
          {nodes.map(({ id, label, detail, icon: Icon }, index) => (
            <button
              key={id}
              onClick={() => setSelected(index)}
              aria-pressed={selected === index}
              className={selected === index ? "selected" : ""}
            >
              {selected === index && (
                <motion.span
                  aria-hidden="true"
                  className="selector-highlight"
                  layoutId="nexus-selection"
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 36 }
                  }
                />
              )}
              <span className="selector-number">0{index + 1}</span>
              <Icon size={18} strokeWidth={1.5} />
              <span className="selector-name">
                {label}
                <small>{detail}</small>
              </span>
              <ArrowUpRight className="selector-arrow" size={15} />
            </button>
          ))}
        </nav>
        <div className="nexus-bottom">
          <span>SELECT A SECTION TO EXPLORE</span>
          <a
            href="https://github.com/Nuryanfa"
            target="_blank"
            rel="noreferrer"
          >
            SOURCE & PROJECTS <ArrowUpRight size={12} />
          </a>
        </div>
      </section>
    </AnimatedPage>
  );
}
