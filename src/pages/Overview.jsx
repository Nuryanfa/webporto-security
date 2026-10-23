import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Printer } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { gsap, useGSAP, onStageReady } from "../luxe/gsap";
import useMotionPreference from "../utils/useMotionPreference";
import SplitReveal from "../components/luxe/SplitReveal";
import { trackSpotlight } from "../components/luxe/ProjectCard";
import { experiences } from "../content/experience";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { capabilities } from "../content/capabilities";
import { statusTone } from "../content/episodes";
import { formatBadgeDate, googleSkills } from "../content/credentials";

const facts = [
  { label: "Selected projects", value: String(projects.length).padStart(2, "0"), note: "Builds & security labs", count: projects.length },
  { label: "Engineering roles", value: String(experiences.length).padStart(2, "0"), note: "DevOps, fullstack, backend", count: experiences.length },
  { label: "Core stack", value: "Go × Linux", note: "Docker · PostgreSQL · Redis · gRPC" },
  { label: "Defense", value: "DevSecOps", note: "Wazuh · Suricata · MITRE ATT&CK" },
];

const roles = ["Backend", "Security", "DevOps · Cloud"];

function BriefSection({ index, title, children, id }) {
  return (
    <section className="lx-brief__section" aria-labelledby={id}>
      <div className="lx-section__head" data-reveal>
        <span className="lx-index">({index})</span>
        <h2 id={id} className="lx-eyebrow">
          {title}
        </h2>
        <i className="lx-section__rule" />
      </div>
      {children}
    </section>
  );
}

export default function Overview() {
  const hero = useRef(null);
  const reduced = useMotionPreference();

  useGSAP(
    (_, contextSafe) => {
      if (reduced) return;
      gsap.set(".lx-agent__band", { xPercent: -105 });
      return onStageReady(
        contextSafe(() => gsap.to(".lx-agent__band", { xPercent: 0, duration: 0.6, delay: 0.1, ease: "power4.out" })),
      );
    },
    { scope: hero, dependencies: [reduced] },
  );

  useEffect(() => {
    const handleKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || document.activeElement?.isContentEditable) return;
      if ((e.key === "p" || e.key === "P") && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.print();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <AnimatedPage>
      <div className="lx-page lx-brief">
        <header ref={hero} className="lx-brief__hero">
          <div className="lx-brief__intro">
            <div className="lx-page-head__top" data-reveal>
              <span className="lx-ep-tag">
                Episode 05 <span lang="ja">第伍話</span>
              </span>
              <span className="lx-eyebrow">
                <span lang="ja">人事記録</span> Personnel file · technical brief
              </span>
              <span className="lx-stamp">Declassified</span>
            </div>
            {/* Agent intro: the name on a slanted band, role chips underneath. */}
            <div className="lx-agent">
              <i className="lx-agent__band" aria-hidden="true" />
              <SplitReveal as="h1" type="chars" trigger="intro" delay={0.35} className="lx-display lx-display--md">
                {profile.name}
              </SplitReveal>
            </div>
            <ul className="lx-agent__chips" aria-label="Roles" data-reveal>
              {roles.map((role) => (
                <li key={role}>
                  <span>{role}</span>
                </li>
              ))}
            </ul>
            <p className="lx-page-head__lede" data-reveal>
              <strong>{profile.role}.</strong> {profile.positioning}
            </p>
            <div className="lx-brief__actions" data-reveal>
              <Link to="/" className="lx-btn lx-btn--ghost">
                <ArrowLeft size={17} />
                <span>Back home</span>
              </Link>
              <button type="button" onClick={() => window.print()} className="lx-btn lx-btn--primary" title="Print or save as PDF (P)">
                <Printer size={17} />
                <span>Print / save PDF</span>
              </button>
            </div>
          </div>
          <figure className="lx-brief__portrait" data-clip>
            <img src="/profile.webp" alt={`Portrait of ${profile.name}`} data-parallax="10" />
            <figcaption>
              <span className="lx-status">
                <i />
                Available for hire
              </span>
            </figcaption>
          </figure>
        </header>

        <dl className="lx-facts">
          {facts.map((fact) => (
            <div key={fact.label} className="lx-fact" data-reveal onPointerMove={trackSpotlight}>
              <dt>{fact.label}</dt>
              <dd>
                <b data-count={fact.count}>{fact.value}</b>
                <small data-redact>{fact.note}</small>
              </dd>
            </div>
          ))}
        </dl>

        <BriefSection index="01" title="Core engineering pillars" id="brief-pillars">
          <div className="lx-pillars">
            {capabilities.map((item, index) => (
              <article key={item.id} className="lx-pillar" style={{ "--c": item.color }} data-reveal onPointerMove={trackSpotlight}>
                <div className="lx-pillar__top">
                  <item.icon size={22} strokeWidth={1.4} aria-hidden="true" />
                  <span>0{index + 1} — {item.area}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <span className="lx-pillar__proof">
                  Proven in: <span data-redact>{item.proof}</span>
                </span>
              </article>
            ))}
          </div>
        </BriefSection>

        <BriefSection index="02" title="Selected engineering builds" id="brief-work">
          <ul className="lx-builds">
            {projects.map((project, index) => (
              <li key={project.id} className={`lx-build tone-${statusTone(project.status)}`} data-reveal>
                <span className="lx-build__idx">{String(index + 1).padStart(2, "0")}</span>
                <div className="lx-build__main">
                  <div className="lx-build__meta">
                    <span>{project.type}</span>
                    <span className="lx-status-chip">
                      <i />
                      {project.status}
                    </span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <ul className="lx-tags" aria-label="Technologies">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <Link
                  to={`/archive?project=${project.code}`}
                  className="lx-build__go"
                  aria-label={`Inspect ${project.title}`}
                  data-cursor="Inspect"
                >
                  <ArrowUpRight size={20} />
                </Link>
              </li>
            ))}
          </ul>
        </BriefSection>

        <BriefSection index="03" title="Experience" id="brief-experience">
          <ul className="lx-roles">
            {experiences.map((experience) => (
              <li key={experience.id} className="lx-role" data-reveal>
                <div className="lx-role__head">
                  <span className="lx-role__when">{experience.coordinate}</span>
                  <h3>{experience.role}</h3>
                  <span className="lx-role__place">
                    <span data-redact>{experience.place}</span>
                  </span>
                </div>
                <p>{experience.description}</p>
                <ul className="lx-role__events">
                  {experience.events.map(({ text }) => (
                    <li key={text}>
                      <Check size={14} aria-hidden="true" />
                      {text}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </BriefSection>

        <BriefSection index="04" title="Credentials" id="brief-credentials">
          <div className="lx-creds" data-reveal>
            <header className="lx-creds__head">
              <div>
                <h3>Google Cloud skill badges</h3>
                <p>
                  {googleSkills.total} badges earned on Google Skills · {googleSkills.league}. Highlighted
                  below are the cloud skill badges — hands-on labs completed in Google Cloud projects.
                </p>
              </div>
              <a className="lx-btn lx-btn--ghost" href={googleSkills.url} target="_blank" rel="noreferrer">
                <span>Verify profile</span>
                <ArrowUpRight size={17} />
              </a>
            </header>
            <div className="lx-creds__groups">
              {googleSkills.groups.map((group) => (
                <section key={group.id} className="lx-creds__group" aria-label={group.title}>
                  <h4>{group.title}</h4>
                  <ul>
                    {group.badges.map((badge) => (
                      <li key={badge.title}>
                        <span>{badge.title}</span>
                        <time dateTime={badge.date}>{formatBadgeDate(badge.date)}</time>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </BriefSection>

        <BriefSection index="05" title="Contact" id="brief-contact">
          <div className="lx-brief__contact" data-reveal onPointerMove={trackSpotlight}>
            <div>
              <h3>Open for engineering roles &amp; collaborations.</h3>
              <p>
                Backend engineering, security architecture, and DevOps / cloud infrastructure. See the
                source on GitHub, connect on LinkedIn, or get in touch directly.
              </p>
            </div>
            <div className="lx-brief__actions">
              <Link to="/network" className="lx-btn lx-btn--primary">
                <span>Contact</span>
                <ArrowUpRight size={18} />
              </Link>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className="lx-btn lx-btn--ghost">
                <span>GitHub</span>
                <ArrowUpRight size={18} />
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="lx-btn lx-btn--ghost">
                <span>LinkedIn</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
        </BriefSection>
      </div>
    </AnimatedPage>
  );
}
