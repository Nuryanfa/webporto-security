import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal, X } from "lucide-react";
import { gsap } from "../luxe/gsap";
import usePresence from "../luxe/usePresence";
import { triggerEmergency } from "../luxe/emergency";
import { profile } from "../content/profile";
import { projects } from "../content/projects";
import { experiences } from "../content/experience";
import { capabilities, loadout } from "../content/capabilities";
import { episodes } from "../content/episodes";
import { playTacticalBlip, setSoundEnabled } from "../utils/audioTelemetry";

const EPISODE_ROUTES = ["/", "/archive", "/timeline", "/network", "/overview"];
const ALIASES = {
  home: "/",
  nexus: "/",
  work: "/archive",
  operations: "/archive",
  projects: "/archive",
  trace: "/timeline",
  experience: "/timeline",
  records: "/timeline",
  contact: "/network",
  channel: "/network",
  brief: "/overview",
  overview: "/overview",
};

// Clearly-labelled simulated telemetry (not real production logs).
const FEED = [
  ["wazuh", "rule 5710 sshd: attempt to login using a non-existent user"],
  ["suricata", "ET SCAN potential SSH scan -> dropped, src=198.51.100.23"],
  ["aegisgate", "token-bucket refill ok"],
  ["taskforge", "job lease acquired, state pending -> leased"],
  ["securenet", "vlan20 -> vlan30 inter-VLAN policy: deny (default)"],
  ["ci", "go test ./... ok"],
];

const HELP = [
  "commands:",
  "  whoami               agent profile",
  "  ls operations        list projects        (ls records: experience)",
  "  open <code>          open a project, e.g. open aegis",
  "  episode <1-5>        jump to an episode   (goto <page> also works)",
  "  cat squad.log        capability cores",
  "  loadout              equipment by slot",
  "  sound on|off         UI sound",
  "  feed on|off          simulated SIEM feed",
  "  breach               run the red-alert drill",
  "  clear · exit",
];

const ts = () => new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false });
const pad = (n) => String(n).padStart(2, "0");

export default function TerminalDrawer({ open, onClose }) {
  const navigate = useNavigate();
  const [lines, setLines] = useState([
    { kind: "sys", text: "AGENT-SHELL v7 · NY-07 · type `help`" },
  ]);
  const [value, setValue] = useState("");
  const [feedOn, setFeedOn] = useState(false);
  const history = useRef([]);
  const histIdx = useRef(-1);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const feedIdx = useRef(0);
  const [mounted, root] = usePresence(open, {
    enter: (el) => gsap.from(el, { yPercent: 100, duration: 0.55, ease: "expo.out" }),
    exit: (el) => gsap.to(el, { yPercent: 100, duration: 0.35, ease: "power3.in" }),
  });

  const push = (...items) => setLines((prev) => [...prev, ...items].slice(-200));
  const out = (...texts) => push(...texts.map((text) => ({ kind: "out", text })));
  const err = (text) => push({ kind: "err", text });

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open || !feedOn) return;
    const id = setInterval(() => {
      const [src, msg] = FEED[feedIdx.current++ % FEED.length];
      push({ kind: "feed", text: `${ts()} [sim:${src}] ${msg}` });
    }, 2400);
    return () => clearInterval(id);
  }, [open, feedOn]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, mounted]);

  const route = (to, label) => {
    out(`routing -> ${label}`);
    navigate(to);
  };

  const run = (raw) => {
    const input = raw.trim();
    push({ kind: "cmd", text: input });
    if (!input) return;
    const [cmd, ...args] = input.toLowerCase().split(/\s+/);
    const arg = args.join(" ");

    switch (cmd) {
      case "help":
        out(...HELP);
        break;
      case "whoami":
        out(`${profile.name} — agent NY-07`, profile.role, profile.positioning, `base: ${profile.location}`);
        break;
      case "ls":
      case "dir":
        if (!arg || arg.startsWith("op") || arg === "projects") {
          out(...projects.map((p, i) => `${pad(i + 1)}  ${p.code.padEnd(6)} ${p.title}  [${p.status}]`));
        } else if (arg.startsWith("rec") || arg === "experience") {
          out(...experiences.map((e, i) => `${pad(i + 1)}  ${e.coordinate.padEnd(11)} ${e.role} @ ${e.place}`));
        } else err(`ls: cannot access '${arg}': try operations | records`);
        break;
      case "open": {
        const project = projects.find((p) => p.code.toLowerCase() === arg);
        if (!project) err(`open: unknown target '${arg}' (see: ls operations)`);
        else route(`/archive?project=${project.code}`, `${project.title}`);
        break;
      }
      case "episode":
      case "ep": {
        const to = EPISODE_ROUTES[Number(arg) - 1];
        if (!to) err("episode: choose 1-5");
        else route(to, `EP.${episodes[to].no} ${episodes[to].kanji} ${episodes[to].en}`);
        break;
      }
      case "goto":
      case "cd": {
        const to = ALIASES[arg];
        if (!to) err(`goto: unknown page '${arg}'`);
        else route(to, episodes[to].en);
        break;
      }
      case "cat":
        if (arg === "squad.log" || arg === "triad.log") {
          out(
            ...capabilities.flatMap((c, i) => [
              `[core-${pad(i + 1)}] ${c.kanji} ${c.verb.toUpperCase()} — ${c.title}: READY`,
              `          proven in: ${c.proof}`,
            ]),
            "squad 3/3 — ready to ship",
          );
        } else err(`cat: ${arg || "(missing file)"}: no such file (try squad.log)`);
        break;
      case "loadout":
      case "stack":
        out(...loadout.map((slot) => `${slot.kanji} ${slot.slot.padEnd(26)} ${slot.tools.map((t) => t.name).join(" · ")}`));
        break;
      case "sound":
        if (arg === "on" || arg === "off") {
          setSoundEnabled(arg === "on");
          out(`ui sound: ${arg}`);
        } else err("sound: use on | off");
        break;
      case "feed":
        if (arg === "on" || arg === "off") {
          setFeedOn(arg === "on");
          out(`simulated feed: ${arg}`);
        } else out(`simulated feed: ${feedOn ? "on" : "off"}`);
        break;
      case "breach":
      case "alert":
        out("警告 red alert — drill initiated (simulation)");
        triggerEmergency();
        break;
      case "sudo":
        err("permission denied: this incident will be reported. (nice try)");
        break;
      case "clear":
        setLines([]);
        break;
      case "exit":
      case "quit":
        onClose();
        break;
      default:
        err(`${cmd}: command not found — try help`);
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

  if (!mounted) return null;

  return (
    <section ref={root} className="terminal-drawer lx-term" role="dialog" aria-label="Terminal">
      <header className="lx-term__bar">
        <span>
          <Terminal size={13} /> AGENT-SHELL // bdg-node-07
        </span>
        <span className="lx-term__hint">feed {feedOn ? "on" : "off"} · Esc to close</span>
        <button type="button" onClick={onClose} aria-label="Close terminal">
          <X size={14} />
        </button>
      </header>
      <div className="lx-term__body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i} className={`lx-term__line is-${line.kind}`}>
            {line.kind === "cmd" ? `$ ${line.text}` : line.text}
          </div>
        ))}
        <label className="lx-term__prompt">
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
    </section>
  );
}
