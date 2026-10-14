import { useState } from "react";
import { projectScenes } from "../content/projectScenes";
import DecodeText from "./DecodeText";
import { motion } from "framer-motion";
import useReducedMotion from "../utils/useMotionPreference";
import { Sliders, Cpu, GitBranch } from "lucide-react";

export default function OperationMap({ code }) {
  const stages = projectScenes[code] || [];
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();

  if (!stages.length) return null;

  const currentStage = stages[selected];

  return (
    <section className="operation-map relative overflow-hidden" aria-label={`${code} concept map`}>
      {/* Tactical Corner Brackets */}
      <span className="hud-corner hud-tl" aria-hidden="true" />
      <span className="hud-corner hud-tr" aria-hidden="true" />
      <span className="hud-corner hud-bl" aria-hidden="true" />
      <span className="hud-corner hud-br" aria-hidden="true" />

      {/* Header with Telemetry */}
      <div className="operation-map-heading flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-xs text-resonance">
          <Cpu size={14} className="text-resonance animate-pulse" />
          SYSTEM DATAFLOW // ARCHITECTURAL SCHEMATIC
        </span>
        <span className="font-mono text-[9px] text-muted">
          STAGES 01—03 // INTERACTIVE
        </span>
      </div>

      {/* 3 Interactive Pipeline Stages */}
      <div className="operation-map-stages" role="group" aria-label="Inspect a stage">
        {stages.map((stage, index) => (
          <button
            key={stage.title}
            type="button"
            className={`relative ${selected === index ? "is-active" : ""}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {/* Active Stage Highlight */}
            {selected === index && !reduced && (
              <motion.span
                layoutId="active-stage-glow"
                className="absolute inset-0 border border-resonance/60 bg-resonance/[0.08] pointer-events-none rounded-[2px]"
                transition={{ type: "spring", stiffness: 240, damping: 26 }}
              />
            )}
            <span className="operation-map-marker flex items-center justify-between w-full">
              <span>STAGE 0{index + 1}</span>
              {selected === index ? (
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-resonance" />
              ) : (
                <span className="text-muted/40 font-mono text-[8px]">ACTIVE</span>
              )}
            </span>
            <span className="font-medium text-white/95 mt-1">{stage.title}</span>
          </button>
        ))}
      </div>

      {/* Inspected Stage Details */}
      <div className="operation-map-detail relative" aria-live="polite">
        <span className="flex items-center gap-2">
          <span>PIPELINE FUNCTION / 0{selected + 1}</span>
          <span className="text-resonance/60">[{currentStage?.title?.toUpperCase()}]</span>
        </span>
        <p key={`detail-${selected}`} className="min-h-[44px]">
          <DecodeText text={currentStage?.detail || ""} />
        </p>
      </div>

      {/* Architectural Tradeoff / ADR Section */}
      {currentStage?.tradeoff && (
        <div className="mt-4 pt-3 border-t border-white/[0.07] bg-white/[0.02] p-3 rounded-[2px]">
          <div className="flex items-center gap-2 text-[9px] font-mono text-acid mb-1.5">
            <GitBranch size={13} className="text-acid" />
            <span>ARCHITECTURAL DECISION & TRADEOFF // ADR-0{selected + 1}</span>
          </div>
          <p key={`tradeoff-${selected}`} className="text-xs text-on-surface-variant font-mono leading-relaxed">
            <DecodeText text={currentStage.tradeoff} chars="01!#%&*+=_<>[]" />
          </p>
        </div>
      )}

      <p className="operation-map-note text-muted/70">
        {code === "X509"
          ? "Architecture proposal centered on zero-trust cryptography boundaries and auditable state verification."
          : "Verified architectural baseline derived from production repository requirements and distributed systems best practices."}
      </p>
    </section>
  );
}
