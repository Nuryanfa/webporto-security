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
