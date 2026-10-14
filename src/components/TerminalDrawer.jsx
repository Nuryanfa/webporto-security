import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Terminal, X } from "lucide-react";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import useReducedMotion from "../utils/useMotionPreference";
import { playTacticalBlip } from "../utils/audioTelemetry";

const ROUTES = {
  nexus: "/",
  home: "/",
  operations: "/archive",
  projects: "/archive",
  trace: "/timeline",
  timeline: "/timeline",
  channel: "/network",
  contact: "/network",
  overview: "/overview",
};

// Clearly-labelled simulated telemetry (not real production logs).
const FEED = [
  ["wazuh", "rule 5710 sshd: attempt to login using a non-existent user"],
  ["suricata", "ET SCAN Potential SSH Scan -> dropped, src=198.51.100.23"],
  ["aegisgate", "token-bucket refill ok, burst=40 rate=20/s"],
  ["taskforge", "job lease acquired, state pending -> leased"],
  ["securenet", "vlan20 -> vlan30 inter-VLAN policy: deny (default)"],
  ["ci", "go test ./... ok  (race detector on)"],
  ["wazuh", "FIM: /etc/passwd checksum verified"],
  ["suricata", "flow table pruned, 0 alerts in last 60s"],
];

const HELP = [
  "available commands:",
  "  help               show this list",
  "  whoami             operator profile",
  "  projects           list engineering builds",
  "  stack              core technology stack",
  "  goto <page>        nexus | operations | trace | channel | overview",
  "  feed [on|off]      toggle simulated SIEM feed",
  "  clear              clear output",
  "  exit               close drawer  (also: Esc or `)",
];

const ts = () =>
  new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false });

export default function TerminalDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const [lines, setLines] = useState([
    { kind: "sys", text: "RONIN-SHELL v0.7 // type `help` for commands" },
  ]);
  const [value, setValue] = useState("");
  const [feedOn, setFeedOn] = useState(true);
  const history = useRef([]);
  const histIdx = useRef(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const feedIdx = useRef(0);

  const push = (...items) =>
    setLines((prev) => [...prev, ...items].slice(-200));

  // Focus input when opened
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => inputRef.current?.focus(), reduced ? 0 : 180);
      return () => clearTimeout(id);
    }
  }, [open, reduced]);

  // Simulated feed while open
  useEffect(() => {
    if (!open || !feedOn) return;
    const id = setInterval(() => {
      const [src, msg] = FEED[feedIdx.current++ % FEED.length];
      push({ kind: "feed", text: `${ts()} [${src}] ${msg}` });
    }, 2400);
    return () => clearInterval(id);
  }, [open, feedOn]);

  // Autoscroll
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, open]);

  const run = (raw) => {
    const input = raw.trim();
    push({ kind: "cmd", text: input });
    if (!input) return;
    const [cmd, ...args] = input.toLowerCase().split(/\s+/);

    switch (cmd) {
      case "help":
        push(...HELP.map((text) => ({ kind: "out", text })));
        break;
      case "whoami":
        push(
          { kind: "out", text: profile.name },
          { kind: "out", text: profile.role },
          { kind: "out", text: profile.location },
        );
        break;
      case "projects":
        push(
          ...projects.map((p, i) => ({
            kind: "out",
            text: `${String(i + 1).padStart(2, "0")}  ${p.code.padEnd(6)} ${p.title}  [${p.status}]`,
          })),
        );
        break;
      case "stack":
        push({
          kind: "out",
          text: "Go · Linux · Docker · PostgreSQL · Redis · gRPC · Wazuh · Suricata",
        });
        break;
      case "goto": {
        const target = ROUTES[args[0]];
        if (!target) {
          push({ kind: "err", text: `goto: unknown page '${args[0] || ""}'` });
        } else {
          push({ kind: "out", text: `routing -> ${target}` });
          navigate(target);
        }
        break;
      }
      case "feed":
        if (args[0] === "off") setFeedOn(false);
        else if (args[0] === "on") setFeedOn(true);
        else {
          push({ kind: "out", text: `simulated feed: ${feedOn ? "on" : "off"}` });
          break;
        }
        push({ kind: "out", text: `simulated feed: ${args[0]}` });
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        onClose();
        break;
      default:
        push({ kind: "err", text: `${cmd}: command not found` });
    }
  };

  const onKeyDown = (e) => {
    e.stopPropagation();
    if (e.key === "Escape" || e.key === "`") {
      e.preventDefault();
      onClose();
    } else if (e.key === "Enter") {
      history.current.unshift(value);
      histIdx.current = -1;
      playTacticalBlip(700, 0.03);
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      histIdx.current = Math.min(histIdx.current + 1, history.current.length - 1);
      setValue(history.current[histIdx.current] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      histIdx.current = Math.max(histIdx.current - 1, -1);
      setValue(history.current[histIdx.current] ?? "");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          className="terminal-drawer"
          role="dialog"
          aria-label="Tactical terminal"
          initial={reduced ? false : { y: "100%" }}
          animate={{ y: 0 }}
          exit={reduced ? { opacity: 0 } : { y: "100%" }}
          transition={
            reduced
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 30 }
          }
        >
          <header className="terminal-bar">
            <span>
              <Terminal size={13} /> RONIN-SHELL // bdg-node-0x7F
            </span>
            <span className="terminal-bar-hint">
              simulated feed {feedOn ? "ON" : "OFF"} · Esc to close
            </span>
            <button type="button" onClick={onClose} aria-label="Close terminal">
              <X size={14} />
            </button>
          </header>
          <div
            className="terminal-body"
            ref={bodyRef}
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) => (
              <div key={i} className={`t-line t-${l.kind}`}>
                {l.kind === "cmd" ? `$ ${l.text}` : l.text}
              </div>
            ))}
            <label className="t-prompt">
              <span>$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                aria-label="Terminal command input"
              />
            </label>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
