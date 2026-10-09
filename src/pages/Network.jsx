import MagneticLink from "../components/MagneticLink";
import MotionHeading from "../components/MotionHeading";
import ContentTransition from "../components/ContentTransition";
import { useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
import { Github, Linkedin, Mail, Radio, Send } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";

export default function Network() {
  const email = "nuryanfa93@gmail.com";
  const [channel, setChannel] = useState("email");
  const reduced = useReducedMotion();
  const channels = {
    email: {
      icon: Mail,
      label: "Direct mail",
      value: "Start a conversation by email",
      href: `mailto:${email}`,
      action: "Open email app",
    },
    github: {
      icon: Github,
      label: "Source network",
      value: "github.com/Nuryanfa",
      href: "https://github.com/Nuryanfa",
      action: "Inspect repositories",
    },
    linkedin: {
      icon: Linkedin,
      label: "Professional relay",
      value: "Muhamad Nur Yanfa",
      href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368",
      action: "Open connection",
    },
  };
  const channelKeys = Object.keys(channels);
  const selectWithKeyboard = (event, index) => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % channelKeys.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + channelKeys.length) % channelKeys.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = channelKeys.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    const nextKey = channelKeys[next];
    setChannel(nextKey);
    document.getElementById(`channel-tab-${nextKey}`)?.focus();
  };
  const current = channels[channel];
  const Icon = current.icon;
  return (
    <AnimatedPage>
      <div className="channel-shell">
        <header className="channel-heading">
          <span className="eyebrow">41 / Communication array</span>
          <MotionHeading>
            OPEN A<br />
            CHANNEL.
          </MotionHeading>
          <p>
            For backend, security, and DevOps opportunities, collaborations, or
            technical conversations. Choose how you’d like to connect.
          </p>
        </header>
        <section className="channel-console">
          <div className="channel-radar">
            <div className="radar-grid">
              <motion.div
                className="radar-sweep-arm"
                animate={{ rotate: -25 }}
                transition={{ duration: 0 }}
              />
              {Object.keys(channels).map((key, index) => (
                <button
                  key={key}
                  type="button"
                  className={`radar-contact contact-${["a", "b", "c"][index]}`}
                  aria-label={`Select ${channels[key].label}`}
                  aria-pressed={channel === key}
                  onClick={() => setChannel(key)}
                />
              ))}
              <Radio className="radar-center" />
            </div>
            <div className="channel-status">
              <i /> OPERATOR AVAILABLE
            </div>
          </div>
          <div className="channel-panel">
            <div
              className="channel-tabs"
              role="tablist"
              aria-label="Contact channels"
            >
              {Object.entries(channels).map(([key, item], index) => (
                <button
                  id={`channel-tab-${key}`}
                  aria-label={item.label}
                  aria-controls={`channel-readout-${key}`}
                  role="tab"
                  aria-selected={channel === key}
                  tabIndex={channel === key ? 0 : -1}
                  key={key}
                  onClick={() => setChannel(key)}
                  onKeyDown={(event) => selectWithKeyboard(event, index)}
                  className={channel === key ? "is-active" : ""}
                >
                  {channel === key && (
                    <motion.span
                      className="channel-selection-glow"
                      layoutId="channel-selection"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 210, damping: 28 }
                      }
                      aria-hidden="true"
                    />
                  )}
                  <item.icon size={17} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <ContentTransition id={channel}>
              <div
                id={`channel-readout-${channel}`}
                role="tabpanel"
                aria-labelledby={`channel-tab-${channel}`}
                className="channel-readout"
              >
                <span>ACTIVE FREQUENCY / {channel.toUpperCase()}</span>
                <Icon size={36} />
                <h2>
                  <DecodeText text={current.value} />
                </h2>
                <div className="channel-actions" aria-live="polite">
                  <MagneticLink
                    href={current.href}
                    target={channel === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                  >
                    <Send size={16} />
                    {current.action}
                  </MagneticLink>
                </div>
              </div>
            </ContentTransition>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
