import { Fragment } from "react";
import { ArrowUpRight, BadgeCheck, Github, Linkedin, Mail } from "lucide-react";
import { googleSkills } from "../content/credentials";
import AnimatedPage from "../components/AnimatedPage";
import EpisodeHeader from "../components/luxe/EpisodeHeader";
import Availability from "../components/luxe/Availability";
import { profile } from "../content/profile";

// The address is only used in the mailto link; it is never rendered as text.
const email = "nuryanfa93@gmail.com";

const channels = [
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
    key: "skills",
    icon: BadgeCheck,
    label: "Google Skills",
    value: `${googleSkills.total} skill badges`,
    note: "Verified Google Cloud labs",
    href: googleSkills.url,
    cursor: "Verify",
    external: true,
  },
];

export default function Network() {
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

          <aside className="lx-contact__aside" data-reveal>
            <Availability />
            <dl className="lx-contact__facts">
              <div>
                <dt>Status</dt>
                <dd>
                  <span className="lx-statusline lx-statusline--go">
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
