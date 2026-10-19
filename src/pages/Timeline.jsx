import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import SplitReveal from "../components/luxe/SplitReveal";
import { gsap, ScrollTrigger, useGSAP } from "../luxe/gsap";
import useReducedMotion from "../utils/useMotionPreference";
import { experiences } from "../content/experience";

export default function Timeline() {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      // The rail fills as the reader moves through the roles.
      gsap.fromTo(
        ".lx-trace__fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".lx-trace__wrap", start: "top 62%", end: "bottom 62%", scrub: 0.5 },
        },
      );
      gsap.utils.toArray(".lx-trace__item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          end: "bottom 62%",
          toggleClass: { targets: item, className: "is-current" },
        });
        gsap.from(item.querySelectorAll(".lx-trace__events li"), {
          x: -24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 70%", once: true },
        });
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <AnimatedPage>
      <div ref={root} className="lx-page lx-trace">
        <header className="lx-page-head">
          <div className="lx-page-head__top" data-reveal>
            <span className="lx-index">(Experience)</span>
            <span className="lx-eyebrow">Trace — {experiences.length} roles</span>
          </div>
          <SplitReveal as="h1" type="chars" trigger="intro" delay={0.2} className="lx-display">
            Experience, <em>in context.</em>
          </SplitReveal>
          <p className="lx-page-head__lede" data-reveal>
            Three working contexts across backend, fullstack, and DevOps — from a backend
            internship to delivering production systems today.
          </p>
        </header>

        <div className="lx-trace__wrap">
        <div className="lx-trace__rail" aria-hidden="true">
          <i className="lx-trace__fill" />
        </div>
        <ol className="lx-trace__list">
          {experiences.map((item, index) => (
            <li key={item.id} id={`trace-record-${item.id}`} className="lx-trace__item" data-reveal>
              <span className="lx-trace__marker" aria-hidden="true">
                <i />
              </span>
              <div className="lx-trace__head">
                <span className="lx-trace__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="lx-status-chip" style={{ "--c": index === 0 ? "#4ef0a0" : "#8f7cff" }}>
                  <i />
                  {item.coordinate}
                </span>
              </div>
              <div className="lx-trace__main">
                <h2>{item.role}</h2>
                <p className="lx-trace__place">{item.place}</p>
              </div>
              <div className="lx-trace__body">
                <p>{item.description}</p>
                <ul className="lx-trace__events">
                  {item.events.map(({ icon: Icon, text }) => (
                    <li key={text}>
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
                <ul className="lx-tags" aria-label="Focus areas">
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        </div>

        <div className="lx-trace__next" data-reveal>
          <span className="lx-eyebrow">Next</span>
          <Link to="/archive" className="lx-link-arrow">
            See what I built along the way <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </AnimatedPage>
  );
}
