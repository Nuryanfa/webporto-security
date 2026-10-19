import { Fragment, useEffect, useState } from "react";
import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import EpisodeHeader from "../components/luxe/EpisodeHeader";
import { trackSpotlight } from "../components/luxe/ProjectCard";
import { profile } from "../content/profile";

// The address is only used in the mailto link; it is never rendered as text.
const email = "nuryanfa93@gmail.com";

const channels = [
  {
    key: "email",
    icon: Mail,
    label: "Email",
    value: "Start a conversation",
    note: "Opens your email app",
    href: `mailto:${email}`,
    cursor: "Write",
  },
  {
    key: "github",
    icon: Github,
    label: "GitHub",
    value: "github.com/Nuryanfa",
    note: "Repositories & source",
    href: "https://github.com/Nuryanfa",
    cursor: "Source",
    external: true,
  },
  {
    key: "linkedin",
    icon: Linkedin,
    label: "LinkedIn",
    value: profile.name,
    note: "Professional network",
    href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368",
    cursor: "Connect",
    external: true,
  },
];

function useClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Network() {
  const time = useClock();
  return (
    <AnimatedPage>
      <div className="lx-page lx-contact">
        <EpisodeHeader
          eyebrow="Comms array — channels open"
          lede="For backend, security, and DevOps opportunities, collaborations, or technical conversations. Pick whichever channel suits you."
        >
          Open a <em>channel.</em>
        </EpisodeHeader>

        <div className="lx-contact__grid">
          <ul className="lx-channels">
            {channels.map((channel, index) => (
              <li key={channel.key} data-reveal>
                <a
                  className="lx-channel"
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noreferrer" : undefined}
                  data-cursor={channel.cursor}
                >
                  <span className="lx-channel__idx">{String(index + 1).padStart(2, "0")}</span>
                  <span className="lx-channel__icon" aria-hidden="true">
                    <channel.icon size={22} strokeWidth={1.4} />
                  </span>
                  <span className="lx-channel__text">
                    <small>{channel.label}</small>
                    <b>
                      {channel.value.split("/").map((part, i, parts) => (
                        <Fragment key={part}>
                          {part}
                          {i < parts.length - 1 && (
                            <>
                              /<wbr />
                            </>
                          )}
                        </Fragment>
                      ))}
                    </b>
                  </span>
                  <span className="lx-channel__note">{channel.note}</span>
                  <span className="lx-channel__go" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <aside className="lx-contact__aside" data-reveal onPointerMove={trackSpotlight}>
            <div className="lx-radar" aria-hidden="true">
              <i className="lx-radar__ring" />
              <i className="lx-radar__ring" />
              <i className="lx-radar__ring" />
              <i className="lx-radar__sweep" />
              <i className="lx-radar__blip lx-radar__blip--a" />
              <i className="lx-radar__blip lx-radar__blip--b" />
              <i className="lx-radar__blip lx-radar__blip--c" />
            </div>
            <dl className="lx-contact__facts">
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="lx-status">
                    <i />
                    Open to opportunities
                  </span>
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Local time</dt>
                <dd className="lx-contact__clock">{time} · UTC+7</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{profile.role}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </AnimatedPage>
  );
}
