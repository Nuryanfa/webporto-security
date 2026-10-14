import MotionHeading from "../components/MotionHeading";
import ContentTransition from "../components/ContentTransition";
import { useState } from "react";
import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";
import { experiences } from "../content/experience";

export default function Timeline() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const signal = experiences[active];

  const selectWithKeyboard = (event, index) => {
    let next;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % experiences.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + experiences.length) % experiences.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = experiences.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`trace-tab-${experiences[next].id}`)?.focus();
  };

  const wavePath = "M0 70h110l24-12 24 24 24-60 28 101 28-88 28 49 26-14h140l25-18 28 39 30-68 30 98 32-83 27 46 29-14h142";

  return (
    <AnimatedPage>
      <div className="trace-shell">
        <header className="trace-title">
          <span className="eyebrow flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance animate-pulse" />
            29 / Signal trace // engineering timeline
          </span>
          <MotionHeading>
            FOLLOW THE
            <br />
            LIVE WIRE.
          </MotionHeading>
          <p>
            Three working contexts across backend, fullstack, and DevOps.
            Select a role to inspect telemetry, responsibilities, and delivered systems.
          </p>
        </header>

        <div className="trace-console relative">
          {/* Live Cyber Oscilloscope Waveform */}
          <div className="trace-wave relative" aria-hidden="true">
            <svg viewBox="0 0 1000 140" preserveAspectRatio="none" className="w-full h-full">
              {/* Base Wave Track */}
              <motion.path
                d={wavePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                initial={reduced ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: reduced ? 0 : 1.3,
                  delay: reduced ? 0 : 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              {/* Continuous Glowing Signal Pulse Beacon */}
              {!reduced && (
                <motion.path
                  d={wavePath}
                  fill="none"
                  stroke="#00f3ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="0.035 0.965"
                  animate={{ strokeDashoffset: [0.035, -1] }}
                  transition={{
                    duration: 2.2,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{ filter: "drop-shadow(0 0 7px #00f3ff)" }}
                />
              )}
            </svg>
            {/* Live Oscilloscope Telemetry Line */}
            <div className="flex justify-between items-center text-[8px] font-mono text-resonance/60 px-3 pt-1">
              <span>OSC_FREQ: 104.7 kHz // SAMPLE_RATE: 96kSPS</span>
              <span>LIVE_TELEMETRY: LOCKED [●]</span>
            </div>
          </div>

          <div
            className="trace-axis"
            role="tablist"
            aria-label="Experience timeline"
          >
            {experiences.map((item, index) => (
              <button
                id={`trace-tab-${item.id}`}
                role="tab"
                aria-selected={active === index}
                aria-controls={`trace-record-${item.id}`}
                tabIndex={active === index ? 0 : -1}
                key={item.id}
                onClick={() => setActive(index)}
                onKeyDown={(event) => selectWithKeyboard(event, index)}
                className={`relative ${active === index ? "is-active" : ""}`}
              >
                <span className="trace-dot" />
                {active === index && (
                  <motion.span
                    className="trace-active-line"
                    layoutId="trace-selection"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 210, damping: 28 }
                    }
                    aria-hidden="true"
                  />
                )}
                <b>{item.coordinate}</b>
                <small>{item.id}</small>
              </button>
            ))}
          </div>

          <ContentTransition id={signal.id}>
            <section
              id={`trace-record-${signal.id}`}
              role="tabpanel"
              aria-labelledby={`trace-tab-${signal.id}`}
              className="trace-record relative"
            >
              {/* Tactical Corner Brackets */}
              <span className="hud-corner hud-tl" aria-hidden="true" />
              <span className="hud-corner hud-tr" aria-hidden="true" />
              <span className="hud-corner hud-bl" aria-hidden="true" />
              <span className="hud-corner hud-br" aria-hidden="true" />

              <div>
                <span className="eyebrow flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance" />
                  Decoded record // {signal.id}
                </span>
                <h2>
                  <DecodeText text={signal.role} />
                </h2>
                <p className="trace-place font-mono text-resonance/90">{signal.place}</p>
                <p className="trace-copy">{signal.description}</p>
              </div>

              <div className="trace-events">
                {signal.events.map(({ icon: Icon, text }, i) => (
                  <div key={text} className="group hover:border-resonance/40 transition-colors">
                    <Icon size={17} className="text-resonance/80 group-hover:text-resonance transition-colors" />
                    <span>{text}</span>
                    <b className="font-mono text-resonance/60">0{i + 1}</b>
                  </div>
                ))}
                <div className="mt-5 flex flex-wrap gap-2">
                  {signal.tags.map((tag) => (
                    <span className="tech-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </ContentTransition>
        </div>
      </div>
    </AnimatedPage>
  );
}
