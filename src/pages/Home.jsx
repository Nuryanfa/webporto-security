import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Braces, Route, Radio } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import WorldBackdrop from "../components/WorldBackdrop";
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.16 }}
              >
                <h1>{active.title}</h1>
                <p>{active.description}</p>
                <Link className="nexus-cta" to={active.to}>
                  {active.action}
                  <ArrowUpRight size={17} />
                </Link>
                <div className="nexus-meta">{active.meta}</div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="identity-scene">
            <WorldBackdrop />
            <div className="scene-caption">
              <span>IDENTITY / NY—07</span>
              <ShieldCheck size={15} />
            </div>
            <div className="identity-rings">
              <span className="identity-orbit orbit-outer" />
              <span className="identity-orbit orbit-inner" />
              <div className="identity-cross cross-h" />
              <div className="identity-cross cross-v" />
              <div className="identity-photo">
                <img
                  src="/profile.webp"
                  alt="Muhamad Nur Yanfa"
                  fetchPriority="high"
                />
              </div>
              <span className="orbit-point point-a" />
              <span className="orbit-point point-b" />
            </div>
            <div className="scene-foot">
              <span>開発者 / DEVELOPER</span>
              <span>6°55′ S · 107°36′ E</span>
            </div>
          </div>
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
