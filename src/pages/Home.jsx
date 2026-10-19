import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import MagneticLink from "../components/MagneticLink";
import DecodeText from "../components/DecodeText";
import SplitReveal from "../components/luxe/SplitReveal";
import ScrollWords from "../components/luxe/ScrollWords";
import Marquee from "../components/luxe/Marquee";
import ProjectCard from "../components/luxe/ProjectCard";
import TriadPanel from "../components/luxe/TriadPanel";
import ThreatMap from "../components/luxe/ThreatMap";
import { gsap, useGSAP, onIntroDone } from "../luxe/gsap";
import useMotionPreference from "../utils/useMotionPreference";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experiences } from "../content/experience";
import { capabilities, stack } from "../content/capabilities";

const HeroCore = lazy(() => import("../components/luxe/HeroCore"));

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function SectionHead({ index, kanji, label }) {
  return (
    <div className="lx-section__head" data-reveal>
      <span className="lx-index">{index}</span>
      <span className="lx-section__kanji" lang="ja">
        {kanji}
      </span>
      <span className="lx-eyebrow">{label}</span>
      <i className="lx-section__rule" />
    </div>
  );
}

const warnings = [
  "警告 Warning",
  "Unauthorized access will be traced",
  "防衛線 Defense line holding",
  "Pattern: secure",
  "侵入検知 Intrusion detection online",
  "All systems nominal",
];

export default function Home() {
  const root = useRef(null);
  const reduced = useMotionPreference();
  const [webgl, setWebgl] = useState(false);

  // The 3D scene only exists in the browser; server render keeps a CSS core.
  useEffect(() => setWebgl(supportsWebGL()), []);

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      const cancelIntro = onIntroDone(
        contextSafe(() => {
          gsap.from("[data-hero-fade]", {
            autoAlpha: 0,
            y: 24,
            duration: 1.1,
            stagger: 0.08,
            delay: 0.45,
            ease: "expo.out",
          });
          gsap.from(".lx-hero__kanji", { yPercent: 12, autoAlpha: 0, duration: 1.6, ease: "expo.out", delay: 0.2 });
          gsap.from(".lx-core-wrap", { autoAlpha: 0, scale: 0.6, duration: 2, ease: "expo.out" });
          gsap.from(".lx-hero__rule", { scaleX: 0, duration: 1.4, ease: "expo.inOut", delay: 0.3 });
        }),
      );

      // Hero recedes as the page scrolls away from it.
      const heroScroll = { trigger: ".lx-hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".lx-hero__content", { yPercent: -12, autoAlpha: 0.15, ease: "none", scrollTrigger: heroScroll });
      gsap.to(".lx-core-wrap", { yPercent: 20, scale: 0.85, ease: "none", scrollTrigger: heroScroll });
      gsap.to(".lx-hero__kanji", { yPercent: -18, ease: "none", scrollTrigger: heroScroll });

      // Desktop: operations scroll sideways while the section is pinned.
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
        gsap.utils.toArray(".lx-work .lx-card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".lx-card__code"),
            { xPercent: 18 },
            {
              xPercent: -12,
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
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
          <div className="lx-core-wrap">
            {webgl ? (
              <Suspense fallback={<div className="lx-core-fallback" aria-hidden="true" />}>
                <HeroCore reduced={reduced} />
              </Suspense>
            ) : (
              <div className="lx-core-fallback" aria-hidden="true" />
            )}
          </div>
          <div className="lx-hero__kanji" lang="ja" aria-hidden="true">
            防衛
          </div>

          <div className="lx-hero__content">
            <div className="lx-hero__meta" data-hero-fade>
              <span className="lx-ep-tag">
                Episode 01 <span lang="ja">第壱話</span> · <span lang="ja">起動</span> System online
              </span>
              <span className="lx-alert-chip">
                <i />
                Open to backend · security · DevOps roles
              </span>
            </div>

            <div className="lx-hero__main">
              <span className="lx-hero__role" data-hero-fade>
                <DecodeText text="BACKEND // SECURITY // DEVOPS" />
              </span>
              <h1 id="hero-title" className="lx-hero__title">
                <SplitReveal as="span" type="chars" trigger="intro" stagger={0.03} className="lx-hero__line">
                  Muhamad
                </SplitReveal>
                <SplitReveal
                  as="span"
                  type="chars"
                  trigger="intro"
                  delay={0.12}
                  stagger={0.03}
                  className="lx-hero__line lx-hero__line--accent"
                >
                  Nur Yanfa
                </SplitReveal>
              </h1>
              <i className="lx-hero__rule" aria-hidden="true" />
            </div>

            <div className="lx-hero__bottom">
              <div className="lx-hero__brief" data-hero-fade>
                <p className="lx-hero__lede">
                  <strong>
                    {profile.taglineLead} <em>{profile.taglineAccent}</em>
                  </strong>
                  {profile.positioning}
                </p>
                <div className="lx-hero__actions">
                  <MagneticLink to="/archive" className="lx-btn lx-btn--primary">
                    <span lang="ja">作戦</span>
                    <span>Enter operations</span>
                    <ArrowUpRight size={18} />
                  </MagneticLink>
                  <MagneticLink to="/network" className="lx-btn lx-btn--ghost">
                    <span lang="ja">通信</span>
                    <span>Open channel</span>
                  </MagneticLink>
                </div>
              </div>
              <div data-hero-fade>
                <TriadPanel />
              </div>
            </div>

            <div className="lx-hero__foot" data-hero-fade>
              <span className="lx-scroll-cue">
                <ArrowDown size={14} /> Scroll to engage
              </span>
              <span>Bandung, ID — UTC+7</span>
            </div>
          </div>
        </section>

        {/* ── Warning band ──────────────────────────────────── */}
        <section className="lx-band" aria-label="Status ticker and technology stack">
          <Marquee items={warnings} speed={34} className="lx-marquee--alert" />
          <Marquee items={stack} reverse speed={48} className="lx-marquee--outline" />
        </section>

        {/* ── Directive ─────────────────────────────────────── */}
        <section className="lx-section lx-directive" aria-labelledby="directive-title">
          <SectionHead index="01" kanji="指令" label="Directive" />
          <h2 id="directive-title" className="sr-only">
            Directive
          </h2>
          <div className="lx-directive__grid">
            <ScrollWords className="lx-statement">
              I build backend systems, define security boundaries, and improve the delivery paths
              that keep software reliable. Go on the server, Linux underneath — and security
              considered from the first commit, not bolted on at the end.
            </ScrollWords>
            <dl className="lx-stats">
              <div data-reveal>
                <dt>Operations on file</dt>
                <dd data-count={projects.length}>{String(projects.length).padStart(2, "0")}</dd>
              </div>
              <div data-reveal>
                <dt>Field records</dt>
                <dd data-count={experiences.length}>{String(experiences.length).padStart(2, "0")}</dd>
              </div>
              <div data-reveal>
                <dt>Core stack</dt>
                <dd className="lx-stats__text">Go × Linux</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* ── Capabilities ──────────────────────────────────── */}
        <section className="lx-section lx-caps" aria-labelledby="caps-title">
          <SectionHead index="02" kanji="三位一体" label="Capabilities" />
          <SplitReveal as="h2" id="caps-title" className="lx-h2">
            Three cores. <em>One system.</em>
          </SplitReveal>
          <div className="lx-caps__grid">
            {capabilities.map((item, index) => (
              <article key={item.id} className="lx-cap" style={{ "--c": item.color }} data-reveal>
                <span className="lx-cap__bg" lang="ja" aria-hidden="true">
                  {item.kanji}
                </span>
                <div className="lx-cap__top">
                  <span>Core · 0{index + 1}</span>
                  <span className="lx-cap__vote">
                    <span lang="ja">可決</span> Approved
                  </span>
                </div>
                <span className="lx-cap__kanji" lang="ja">
                  {item.kanji}
                </span>
                <span className="lx-cap__verb">{item.verb}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="lx-cap__proof">
                  <small>Proven in</small>
                  {item.proof}
                </span>
              </article>
            ))}
          </div>
        </section>

        {/* ── Threat telemetry ──────────────────────────────── */}
        <section className="lx-section lx-soc" aria-labelledby="soc-title">
          <SectionHead index="03" kanji="脅威" label="Threat telemetry" />
          <div className="lx-soc__head">
            <SplitReveal as="h2" id="soc-title" className="lx-h2">
              The perimeter <em>holds.</em>
            </SplitReveal>
            <p data-reveal>
              A stylised view of the work: probes arrive, the barrier absorbs them, and every event
              is logged. The feed below is a simulation — the discipline behind it is real.
            </p>
          </div>
          <div data-reveal>
            <ThreatMap />
          </div>
        </section>

        {/* ── Operations (horizontal on desktop) ────────────── */}
        <section className="lx-work" aria-labelledby="work-title">
          <div className="lx-work__track">
            <div className="lx-work__intro">
              <span className="lx-index">04</span>
              <span className="lx-work__kanji" lang="ja">
                作戦
              </span>
              <SplitReveal as="h2" id="work-title" className="lx-h2">
                Operations <em>on file.</em>
              </SplitReveal>
              <p data-reveal>
                {projects.length} builds across backend, security, DevOps, and product engineering —
                each labelled honestly, from released to prototype.
              </p>
              <Link to="/archive" className="lx-link-arrow" data-reveal>
                Open the full archive <ArrowUpRight size={16} />
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

        {/* ── Records ───────────────────────────────────────── */}
        <section className="lx-section lx-exp" aria-labelledby="exp-title">
          <SectionHead index="05" kanji="経歴" label="Field records" />
          <SplitReveal as="h2" id="exp-title" className="lx-h2">
            Learning <em>in the field.</em>
          </SplitReveal>
          <ul className="lx-exp__list">
            {experiences.map((item, index) => (
              <li key={item.id} data-reveal>
                <Link to="/timeline" className="lx-exp-row" data-cursor="Trace">
                  <span className="lx-exp-row__when">
                    REC.0{index + 1} · {item.coordinate}
                  </span>
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
