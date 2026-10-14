import MagneticLink from "../components/MagneticLink";
import MotionHeading from "../components/MotionHeading";
import ContentTransition from "../components/ContentTransition";
import { useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
import { Github, Linkedin, Mail, Radio, Send } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";
import LockOn from "../components/LockOn";

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
      coord: "045° AZ // DIRECT",
    },
    github: {
      icon: Github,
      label: "Source network",
      value: "github.com/Nuryanfa",
      href: "https://github.com/Nuryanfa",
      action: "Inspect repositories",
      coord: "135° AZ // RELAY",
    },
    linkedin: {
      icon: Linkedin,
      label: "Professional relay",
      value: "Muhamad Nur Yanfa",
      href: "https://www.linkedin.com/in/muhamad-nur-yanfa-069036368",
      action: "Open connection",
      coord: "270° AZ // BEACON",
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
          <span className="eyebrow flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
            41 / Communication array // RF & Digital Relays
          </span>
          <MotionHeading>
            OPEN A<br />
            CHANNEL.
          </MotionHeading>
          <p>
            For backend, security, and DevOps opportunities, collaborations, or
            technical conversations. Choose your designated communication frequency.
          </p>
        </header>

        <section className="channel-console">
          {/* Active Tactical Sonar Radar */}
          <div className="channel-radar relative overflow-hidden">
            <div className="radar-grid relative">
              {/* Expanding Sonar Ping Ring */}
              {!reduced && <div className="sonar-ping" aria-hidden="true" />}

              {/* Smooth Continuous 360° Radar Sweep */}
              <motion.div
                className="radar-sweep-arm"
                animate={reduced ? { rotate: -25 } : { rotate: [0, 360] }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 7, ease: "linear", repeat: Infinity }
                }
              />

              {/* Radar Contacts / Blips with Active Pulsing Ring */}
              {Object.keys(channels).map((key, index) => (
                <button
                  key={key}
                  type="button"
                  className={`radar-contact contact-${["a", "b", "c"][index]} relative`}
                  aria-label={`Select ${channels[key].label}`}
                  aria-pressed={channel === key}
                  onClick={() => setChannel(key)}
                >
                  {channel === key && !reduced && (
                    <span className="absolute inset-[-6px] rounded-full border border-resonance animate-ping pointer-events-none" />
                  )}
                </button>
              ))}

              <Radio className="radar-center text-resonance" />
            </div>

            <div className="channel-status flex items-center justify-between px-3 gap-3">
              <span className="flex items-center gap-2 font-mono text-[9px]">
                <i className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
                OPERATOR AVAILABLE
              </span>
              <span className="font-mono text-[8px] text-resonance/60">
                // {current.coord}
              </span>
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
                  className={`relative ${channel === key ? "is-active" : ""}`}
                >
                  {/* Tactical Corner Brackets */}
                  <span className="hud-corner hud-tl" aria-hidden="true" />
                  <span className="hud-corner hud-tr" aria-hidden="true" />

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
                className="channel-readout holo-tilt relative"
              >
                {/* Tactical Corner Brackets */}
                <span className="hud-corner hud-tl" aria-hidden="true" />
                <span className="hud-corner hud-tr" aria-hidden="true" />
                <span className="hud-corner hud-bl" aria-hidden="true" />
                <span className="hud-corner hud-br" aria-hidden="true" />

                <span className="font-mono text-xs text-resonance/80 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
                  ACTIVE FREQUENCY // {channel.toUpperCase()} // 433.92 MHz
                </span>

                <motion.div
                  key={`icon-${channel}`}
                  initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Icon size={38} className="text-resonance" />
                </motion.div>

                <h2>
                  <DecodeText text={current.value} />
                </h2>

                <div className="channel-actions" aria-live="polite">
                  <LockOn label={channel.toUpperCase()}>
                    <MagneticLink
                      href={current.href}
                      target={channel === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      <Send size={16} />
                      {current.action}
                    </MagneticLink>
                  </LockOn>
                </div>
              </div>
            </ContentTransition>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
}
