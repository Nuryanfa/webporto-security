import { Layers, Server, ShieldCheck } from "lucide-react";

// Core engineering pillars shared by Home and Overview.
export const capabilities = [
  {
    id: "backend",
    icon: Server,
    kanji: "構築",
    verb: "Build",
    area: "Backend & Distributed",
    title: "Resilient Systems & APIs",
    body: "Designing Go microservices with bounded request concurrency, gRPC control planes, Redis token-bucket rate limiting, and durable transactional job state machines.",
    proof: "AegisGate (v0.8), TaskForge (v0.1)",
    color: "#ff7a00",
  },
  {
    id: "security",
    icon: ShieldCheck,
    kanji: "防衛",
    verb: "Defend",
    area: "Application & Network Sec",
    title: "Defensive Security & Threat Ops",
    body: "Constructing Zero-Trust network segmentation with MikroTik VLANs, signature-based IDS rule tuning with Suricata, SIEM event correlation in Wazuh, and MITRE ATT&CK threat mapping.",
    proof: "SecureNet Enterprise Lab, X.509",
    color: "#ff2d4a",
  },
  {
    id: "devops",
    icon: Layers,
    kanji: "運用",
    verb: "Operate",
    area: "DevOps & Infrastructure",
    title: "Reliable Software Delivery",
    body: "Production server deployment, container orchestration via Docker, automated CI/CD pipeline authoring, and telemetry observability using OpenTelemetry and Prometheus.",
    proof: "Nuansa Teknologi Indonesia (current)",
    color: "#b6ff3b",
  },
];

export const stack = [
  "Go",
  "gRPC",
  "Redis",
  "PostgreSQL",
  "Docker",
  "Linux",
  "Prometheus",
  "OpenTelemetry",
  "Wazuh",
  "Suricata",
  "MikroTik",
  "CI/CD",
  "MITRE ATT&CK",
  "React",
];

/*
 * Loadout: tools grouped by slot. `match` lists the exact tags in projects.js /
 * experience.js that count as evidence, so every link shown is backed by content.
 */
export const loadout = [
  {
    slot: "Languages & frameworks",
    kanji: "言語",
    tools: [
      { name: "Go", match: ["Go", "Golang"] },
      { name: "Python", match: ["Python"] },
      { name: "React", match: ["React"] },
      { name: "Node.js", match: ["Node.js", "Express"] },
      { name: "FastAPI", match: ["FastAPI"] },
    ],
  },
  {
    slot: "Infrastructure & data",
    kanji: "基盤",
    tools: [
      { name: "Docker", match: ["Docker"] },
      { name: "PostgreSQL", match: ["PostgreSQL"] },
      { name: "Redis", match: ["Redis"] },
      { name: "MongoDB", match: ["MongoDB"] },
      { name: "gRPC", match: ["gRPC"] },
    ],
  },
  {
    slot: "Security",
    kanji: "防衛",
    tools: [
      { name: "Wazuh", match: ["Wazuh"] },
      { name: "Suricata", match: ["Suricata"] },
      { name: "MikroTik", match: ["MikroTik"] },
      { name: "MITRE ATT&CK", match: ["MITRE ATT&CK"] },
      { name: "Cloud KMS · X.509", match: ["Cloud KMS", "X.509"] },
    ],
  },
  {
    slot: "Delivery & observability",
    kanji: "運用",
    tools: [
      { name: "CI/CD", match: ["CI/CD", "GitLab CI/CD"] },
      { name: "Prometheus", match: ["Prometheus"] },
      { name: "OpenTelemetry", match: ["OpenTelemetry"] },
      { name: "Testing · SQA", match: ["Testing", "SQA"] },
      { name: "Server setup", match: ["Server setup", "Production delivery"] },
    ],
  },
];
