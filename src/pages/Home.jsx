import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import MagneticLink from "../components/MagneticLink";
import SplitReveal from "../components/luxe/SplitReveal";
import ScrollWords from "../components/luxe/ScrollWords";
import Marquee from "../components/luxe/Marquee";
import ProjectCard from "../components/luxe/ProjectCard";
import { gsap, useGSAP, onIntroDone } from "../luxe/gsap";
import useMotionPreference from "../utils/useMotionPreference";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experiences } from "../content/experience";
import { capabilities, stack } from "../content/capabilities";

const HeroOrb = lazy(() => import("../components/luxe/HeroOrb"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function SectionHead({ index, label }) {
  return (
    <div className="lx-section__head" data-reveal>
      <span className="lx-index">({index})</span>
      <span className="lx-eyebrow">{label}</span>
      <i className="lx-section__rule" />
    </div>
  );
}

export default function Home() {
  const root = useRef(null);
  const reduced = useMotionPreference();
  const [webgl, setWebgl] = useState(false);

  // The 3D scene only exists in the browser; server render keeps a CSS orb.
  useEffect(() => setWebgl(supportsWebGL()), []);

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      const cancelIntro = onIntroDone(contextSafe(() => {
        gsap.from("[data-hero-fade]", {
          autoAlpha: 0,
          y: 28,
          duration: 1.3,
          stagger: 0.09,
          delay: 0.55,
          ease: "expo.out",
        });
        gsap.from(".lx-orb-wrap", { autoAlpha: 0, scale: 0.72, duration: 2.4, ease: "expo.out" });
      }));

      // Hero recedes as the page scrolls away from it.
      const heroScroll = { trigger: ".lx-hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".lx-hero__content", { yPercent: -14, autoAlpha: 0.1, ease: "none", scrollTrigger: heroScroll });
      gsap.to(".lx-orb-wrap", { yPercent: 22, scale: 0.86, ease: "none", scrollTrigger: heroScroll });

      // Desktop: selected work scrolls sideways while the section is pinned.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = root.current.querySelector(".lx-work__track");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".lx-work",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(".lx-work__progress i", { scaleX: self.progress }),
          },
        });
        // Icons turn as their card travels across the viewport.
        gsap.utils.toArray(".lx-work .lx-card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".lx-card__icon"),
            { rotate: -24, scale: 0.82 },
            {
              rotate: 12,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: slide,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });
      return () => {
        cancelIntro();
        mm.revert();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <AnimatedPage>
      <div ref={root} className="lx-home">
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="lx-hero" aria-labelledby="hero-title">
          <div className="lx-orb-wrap">
            <div className="lx-orb-halo" aria-hidden="true" />
            {webgl ? (
              <Suspense fallback={<div className="lx-orb-fallback" aria-hidden="true" />}>
                <HeroOrb reduced={reduced} />
              </Suspense>
            ) : (
              <div className="lx-orb-fallback" aria-hidden="true" />
            )}
          </div>

          <div className="lx-hero__content">
            <div className="lx-hero__meta" data-hero-fade>
              <span className="lx-status">
                <i />
                Open to backend, security &amp; DevOps roles
              </span>
              <span className="lx-hero__loc">{profile.location} — UTC+7</span>
            </div>

            <h1 id="hero-title" className="lx-hero__title">
              <SplitReveal as="span" type="chars" trigger="intro" className="lx-hero__line">
                Muhamad
              </SplitReveal>
              <SplitReveal
                as="span"
                type="chars"
                trigger="intro"
                delay={0.14}
                className="lx-hero__line lx-hero__line--accent"
              >
                Nur Yanfa
              </SplitReveal>
            </h1>

            <div className="lx-hero__bottom">
              <p className="lx-hero__lede" data-hero-fade>
                <strong>
                  {profile.taglineLead} <em>{profile.taglineAccent}</em>
                </strong>
                {profile.positioning}
              </p>
              <div className="lx-hero__actions" data-hero-fade>
                <MagneticLink to="/archive" className="lx-btn lx-btn--primary">
                  <span>Explore work</span>
                  <ArrowUpRight size={18} />
                </MagneticLink>
                <MagneticLink to="/network" className="lx-btn lx-btn--ghost">
                  <span>Get in touch</span>
                </MagneticLink>
              </div>
            </div>

            <div className="lx-hero__foot" data-hero-fade>
              <span className="lx-scroll-cue">
                <ArrowDown size={14} /> Scroll
              </span>
              <span className="lx-hero__roles">Backend — Security — DevOps</span>
              <span>Portfolio ©2026</span>
            </div>
          </div>
        </section>

        {/* ── Stack ticker ──────────────────────────────────── */}
        <section className="lx-band" aria-label="Technology stack">
          <Marquee items={stack} />
          <Marquee
            items={["Build", "Defend", "Operate", "Observe", "Harden", "Ship"]}
            reverse
            speed={46}
            className="lx-marquee--outline"
          />
        </section>

        {/* ── Approach ──────────────────────────────────────── */}
        <section className="lx-section lx-about" aria-labelledby="about-title">
          <SectionHead index="01" label="Approach" />
          <h2 id="about-title" className="sr-only">
            Approach
          </h2>
          <div className="lx-about__grid">
            <figure className="lx-portrait" data-clip>
              <img data-parallax="16" src="/profile.webp" alt={`Portrait of ${profile.name}`} loading="lazy" />
              <figcaption>
                <span>NY—07</span>
                <span>Bandung, ID</span>
              </figcaption>
            </figure>
            <div className="lx-about__copy">
              <ScrollWords className="lx-statement">
                I build backend systems, define security boundaries, and improve the delivery paths
                that keep software reliable. Go on the server, Linux underneath — and security
                considered from the first commit, not bolted on at the end.
              </ScrollWords>
              <dl className="lx-stats">
                <div data-reveal>
                  <dt>Selected projects</dt>
                  <dd data-count={projects.length}>{String(projects.length).padStart(2, "0")}</dd>
                </div>
                <div data-reveal>
                  <dt>Engineering roles</dt>
                  <dd data-count={experiences.length}>{String(experiences.length).padStart(2, "0")}</dd>
                </div>
                <div data-reveal>
                  <dt>Core stack</dt>
                  <dd className="lx-stats__text">
                    Go <em>×</em> Linux
                  </dd>
                </div>
              </dl>
              <Link to="/overview" className="lx-link-arrow" data-reveal>
                Read the full overview <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Selected work (horizontal on desktop) ─────────── */}
        <section className="lx-work" aria-labelledby="work-title">
          <div className="lx-work__track">
            <div className="lx-work__intro">
              <span className="lx-index">(02)</span>
              <SplitReveal as="h2" id="work-title" className="lx-h2">
                Selected <em>work</em>
              </SplitReveal>
              <p data-reveal>
                {projects.length} builds across backend, security, DevOps, and product engineering —
                each labelled honestly, from released to prototype.
              </p>
              <Link to="/archive" className="lx-link-arrow" data-reveal>
                Open the full index <ArrowUpRight size={16} />
              </Link>
              <div className="lx-work__progress" aria-hidden="true">
                <i />
              </div>
            </div>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ── Capabilities ──────────────────────────────────── */}
        <section className="lx-section lx-caps" aria-labelledby="caps-title">
          <SectionHead index="03" label="Capabilities" />
          <SplitReveal as="h2" id="caps-title" className="lx-h2">
            Three disciplines, <em>one system.</em>
          </SplitReveal>
          <ol className="lx-caps__list">
            {capabilities.map((item, index) => (
              <li key={item.id} className="lx-cap" style={{ "--c": item.color }} data-reveal>
                <span className="lx-cap__num">0{index + 1}</span>
                <div className="lx-cap__main">
                  <span className="lx-cap__area">{item.area}</span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.body}</p>
                <span className="lx-cap__proof">
                  <small>Proven in</small>
                  {item.proof}
                </span>
                <item.icon className="lx-cap__icon" size={22} strokeWidth={1.4} aria-hidden="true" />
              </li>
            ))}
          </ol>
        </section>

        {/* ── Experience preview ────────────────────────────── */}
        <section className="lx-section lx-exp" aria-labelledby="exp-title">
          <SectionHead index="04" label="Experience" />
          <SplitReveal as="h2" id="exp-title" className="lx-h2">
            Learning <em>in the field.</em>
          </SplitReveal>
          <ul className="lx-exp__list">
            {experiences.map((item) => (
              <li key={item.id} data-reveal>
                <Link to="/timeline" className="lx-exp-row" data-cursor="Trace">
                  <span className="lx-exp-row__when">{item.coordinate}</span>
                  <span className="lx-exp-row__role">{item.role}</span>
                  <span className="lx-exp-row__place">{item.place}</span>
                  <ArrowUpRight className="lx-exp-row__arrow" size={22} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AnimatedPage>
  );
}
