import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Github, Linkedin } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import MagneticLink from "../components/MagneticLink";
import SplitReveal from "../components/luxe/SplitReveal";
import Marquee from "../components/luxe/Marquee";
import ProjectCard from "../components/luxe/ProjectCard";
import TriadPanel from "../components/luxe/TriadPanel";
import Loadout from "../components/luxe/Loadout";
import Monologue from "../components/luxe/Monologue";
import HeroSubtitle from "../components/luxe/Subtitle";
import VhsTape from "../components/luxe/VhsTape";
import { gsap, useGSAP, onIntroDone } from "../luxe/gsap";
import useMotionPreference from "../utils/useMotionPreference";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experiences } from "../content/experience";
import { capabilities, stack } from "../content/capabilities";

// Home shows the first three operations; the archive holds the rest.
const featured = projects.slice(0, 3);

// Phones, weak devices and the moment before the 3D chunk arrives: the same tape, in CSS.
function FlatTape() {
  return (
    <div className="lx-core-fallback">
      <VhsTape title="NY-07" subtitle="Backend · Security · DevOps" sticker="▶ REC" />
    </div>
  );
}

const HeroCore = lazy(() => import("../components/luxe/HeroCore"));

function canRenderCore() {
  const nav = navigator;
  if (nav.connection?.saveData) return false;
  // Phones get the CSS tape: the 3D one is 200px wide there and costs ~1s of main thread.
  if (window.matchMedia("(max-width: 767px)").matches) return false;
  if ((nav.deviceMemory && nav.deviceMemory < 4) || (nav.hardwareConcurrency && nav.hardwareConcurrency < 4)) {
    return false;
  }
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

// Caution-tape segments; `kind` picks the visual treatment.
const tape = [
  { kind: "sign", text: "Caution" },
  { kind: "jp", jp: "立入禁止", text: "Restricted zone" },
  { kind: "area", text: "Area NY-07", jp: "エリア" },
  { kind: "jp", jp: "作業中", text: "Work in progress" },
  { kind: "plain", text: "Proceed with curiosity" },
];

function TapeSegment({ item }) {
  if (item.kind === "sign") return <b className="lx-tape__sign">{item.text}</b>;
  if (item.kind === "area")
    return (
      <span className="lx-tape__area">
        {item.text}
        <small lang="ja">{item.jp}</small>
      </span>
    );
  return (
    <span className="lx-tape__text">
      {item.jp && <span lang="ja">{item.jp}</span>}
      {item.text}
      <i className="lx-tape__chev" aria-hidden="true">
        ››
      </i>
    </span>
  );
}

const warnings = [
  "警告 Warning",
  "Proceed with curiosity",
  "作業中 Work in progress",
  "Status: shipping",
  "侵入検知 Intrusion detection online",
  "All systems nominal",
];

export default function Home() {
  const root = useRef(null);
  const reduced = useMotionPreference();
  const [webgl, setWebgl] = useState(false);

  // The 3D scene only exists in capable browsers; everything else keeps a CSS core.
  useEffect(() => {
    // Load the 3D chunk after first render work settles so it never competes with LCP.
    const start = () => setWebgl(canRenderCore());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 900);
    return () => clearTimeout(id);
  }, []);

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      const cancelIntro = onIntroDone(
        contextSafe(() => {
          // The lede is the LCP element: it only rises, it is never hidden.
          gsap.from("[data-hero-rise]", { y: 20, duration: 1.1, delay: 0.5, ease: "expo.out" });
          gsap.from("[data-hero-fade]", {
            autoAlpha: 0,
            y: 24,
            duration: 1.1,
            stagger: 0.08,
            delay: 0.45,
            ease: "expo.out",
          });
          gsap.from(".lx-tv", { y: 30, autoAlpha: 0, duration: 0.8, ease: "back.out(1.4)", delay: 0.2 });
          gsap.from(".lx-core-wrap", { autoAlpha: 0, scale: 0.7, duration: 1.8, ease: "expo.out" });
          gsap.from(".lx-hero .lx-agent__band", { xPercent: -105, duration: 0.6, delay: 0.1, ease: "power4.out" });
        }),
      );

      // Hero recedes as the page scrolls away from it.
      const heroScroll = { trigger: ".lx-hero", start: "top top", end: "bottom top", scrub: true };
      // The whole hero recedes as one block so its columns stay aligned.
      gsap.to(".lx-hero__grid", { y: -60, autoAlpha: 0.15, ease: "none", scrollTrigger: heroScroll });

      // Desktop: operations scroll sideways while the section is pinned.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = root.current.querySelector(".lx-work__track");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
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
          <div className="lx-hero__meta" data-hero-fade>
            <span className="lx-statusline">
              <b>EP.01</b>
              <span lang="ja">第壱話 · 起動</span>
              <span>System online</span>
            </span>
            <span className="lx-statusline lx-statusline--go">
              <i />
              Open to backend · security · DevOps · cloud roles
            </span>
          </div>

          <div className="lx-hero__grid">
            <div className="lx-hero__text">
              {/* Agent intro: the name on a slanted band, role chips underneath. */}
              <div className="lx-agent lx-agent--hero">
                <i className="lx-agent__band" aria-hidden="true" />
              <h1 id="hero-title" className="lx-hero__title" aria-label={profile.name}>
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
              </div>
              <ul className="lx-agent__chips" aria-label="Roles" data-hero-fade>
                {["Backend", "Security", "DevOps · Cloud"].map((role) => (
                  <li key={role}>
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
              <p className="lx-hero__lede" data-hero-rise>
                <strong>
                  {profile.taglineLead} <em>{profile.taglineAccent}</em>
                </strong>
                {profile.positioning}
              </p>
              <div className="lx-hero__actions" data-hero-fade>
                <MagneticLink to="/archive" className="lx-btn lx-btn--primary">
                  <span lang="ja">作戦</span>
                  <span>View my work</span>
                  <ArrowUpRight size={18} />
                </MagneticLink>
                <MagneticLink
                  href={profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="lx-btn lx-btn--ghost"
                >
                  <Github size={17} aria-hidden="true" />
                  <span>GitHub</span>
                </MagneticLink>
                <MagneticLink
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="lx-btn lx-btn--ghost"
                >
                  <Linkedin size={17} aria-hidden="true" />
                  <span>LinkedIn</span>
                </MagneticLink>
              </div>
            </div>

            <div className="lx-hero__visual">
              {/* The agent tape plays on a CRT screen: channel bar, scanlines, vignette. */}
              <div className="lx-hero__stage lx-tv">
                <div className="lx-tv__bar" aria-hidden="true">
                  <span className="lx-tv__live">
                    <i /> CH.01 · Live
                  </span>
                  <span>Now playing</span>
                </div>
                <div className="lx-tv__screen">
                  <div className="lx-core-wrap">
                    {webgl ? (
                      <Suspense fallback={<FlatTape />}>
                        <HeroCore reduced={reduced} />
                      </Suspense>
                    ) : (
                      <FlatTape />
                    )}
                  </div>
                </div>
              </div>
              <div className="lx-hero__triad" data-hero-fade>
                <TriadPanel />
              </div>
            </div>
          </div>

          <div className="lx-hero__foot" data-hero-fade>
            <span className="lx-scroll-cue">
              <ArrowDown size={14} /> Scroll to engage
            </span>
            <HeroSubtitle fallback="Click anywhere to play the tape" />
            <span>Bandung, ID — UTC+7</span>
          </div>
        </section>

        {/* ── Warning band ──────────────────────────────────── */}
        <section className="lx-band" aria-label="Status ticker and technology stack">
          {/* Caution-tape zone: two crossed tapes, the front one running right. */}
          <div className="lx-zone">
            <Marquee items={warnings} speed={46} decorative className="lx-marquee--alert lx-tape lx-tape--back" />
            <Marquee
              items={tape}
              reverse
              speed={26}
              label="Caution: restricted zone, work in progress"
              renderItem={(item) => <TapeSegment item={item} />}
              className="lx-marquee--alert lx-tape lx-tape--front"
            />
          </div>
          <Marquee items={stack} reverse speed={48} className="lx-marquee--outline" />
        </section>

        {/* ── Monologue ─────────────────────────────────────── */}
        <Monologue />

        {/* ── Capabilities ──────────────────────────────────── */}
        <section className="lx-section lx-caps" aria-labelledby="caps-title">
          <SectionHead index="01" kanji="三位一体" label="Capabilities" />
          <SplitReveal as="h2" id="caps-title" className="lx-h2">
            Three cores. <em>One system.</em>
          </SplitReveal>
          <div className="lx-caps__grid">
            {capabilities.map((item, index) => (
              <article
                key={item.id}
                className="lx-cap"
                style={{ "--c": item.color }}
                data-reveal={index % 2 ? "right" : ""}
              >
                <header className="lx-cap__head">
                  <span className="lx-cap__num">Core 0{index + 1}</span>
                  <span className="lx-cap__area">{item.area}</span>
                </header>
                <div className="lx-cap__body">
                  <span className="lx-cap__glyph" aria-hidden="true">
                    <span lang="ja">{item.kanji}</span>
                    <small>{item.verb}</small>
                  </span>
                  <div className="lx-cap__copy">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </div>
                <footer className="lx-cap__proof">
                  <span>Proven in</span>
                  <ul>
                    {item.evidence.map((ev) => (
                      <li key={ev.label}>
                        {ev.href ? (
                          <a href={ev.href} target="_blank" rel="noreferrer">
                            {ev.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </a>
                        ) : (
                          <Link to={ev.to}>
                            {ev.label}
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* ── Loadout ───────────────────────────────────────── */}
        <section className="lx-section lx-gear" aria-labelledby="gear-title">
          <SectionHead index="02" kanji="装備" label="Loadout" />
          <div className="lx-gear__head">
            <SplitReveal as="h2" id="gear-title" className="lx-h2">
              Equipped <em>loadout.</em>
            </SplitReveal>
            <p data-reveal>
              The tools behind the work, grouped by slot. Select one to see exactly which operations
              and field records it was used in.
            </p>
          </div>
          <Loadout />
        </section>

        {/* ── Operations (horizontal on desktop) ────────────── */}
        <section className="lx-work" aria-labelledby="work-title">
          <div className="lx-work__track">
            <div className="lx-work__intro">
              <span className="lx-index">03</span>
              <span className="lx-work__kanji" lang="ja">
                作戦
              </span>
              <SplitReveal as="h2" id="work-title" className="lx-h2">
                Selected <em>work.</em>
              </SplitReveal>
              <p data-reveal>
                Three of {projects.length} builds across backend, security, DevOps, and product
                engineering — each labelled honestly, from released to prototype.
              </p>
              <Link to="/archive" className="lx-link-arrow" data-reveal>
                See all {projects.length} projects <ArrowUpRight size={16} />
              </Link>
              <div className="lx-work__progress" aria-hidden="true">
                <i />
              </div>
            </div>
            {featured.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* ── Records ───────────────────────────────────────── */}
        <section className="lx-section lx-exp" aria-labelledby="exp-title">
          <SectionHead index="04" kanji="経歴" label="Experience" />
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
