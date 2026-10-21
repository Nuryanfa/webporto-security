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
    evidence: [
      { label: "AegisGate", to: "/archive?project=AEGIS" },
      { label: "TaskForge", to: "/archive?project=TFGE" },
    ],
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
    evidence: [
      { label: "SecureNet Lab", to: "/archive?project=SNET" },
      { label: "X.509 Validation", to: "/archive?project=X509" },
    ],
    color: "#ff2d4a",
  },
  {
    id: "devops",
    icon: Layers,
    kanji: "運用",
    verb: "Operate",
    area: "DevOps & Cloud",
    title: "Cloud & Software Delivery",
    body: "Deploying and running workloads on Google Cloud, Azure, and VPS hosts — compute, networking, firewall rules, and IAM — plus Docker, automated CI/CD pipelines, and observability with OpenTelemetry and Prometheus.",
    proof: "Nuansa Teknologi Indonesia (current)",
    evidence: [
      { label: "DevOps at NTI", to: "/timeline" },
      {
        label: "Google Skills · 23 badges",
        href: "https://www.skills.google/public_profiles/7e1b2448-d30c-499f-a889-034966a54a1b",
      },
    ],
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
  "Google Cloud",
  "Azure",
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
      { name: "CI/CD", match: ["CI/CD", "GitLab CI/CD"], badges: ["Implement CI/CD Pipelines on Google Cloud"] },
      { name: "Prometheus", match: ["Prometheus"] },
      { name: "Cloud Monitoring", match: [], badges: ["Monitoring in Google Cloud"] },
      { name: "OpenTelemetry", match: ["OpenTelemetry"] },
      { name: "Testing · SQA", match: ["Testing", "SQA"] },
      { name: "Server setup", match: ["Server setup", "Production delivery"] },
    ],
  },
  {
    slot: "Cloud platforms",
    kanji: "雲",
    tools: [
      { name: "Google Cloud", match: ["Cloud KMS", "Google Cloud"], badges: "all" },
      {
        name: "Network & IAM",
        match: ["Cloud networking"],
        badges: [
          "Privileged Access with IAM",
          "Connecting Cloud Networks with NCC",
          "Arcade Simulator: Network Security Engineer",
        ],
      },
      {
        name: "Compute & load balancing",
        match: ["Cloud & VPS hosting"],
        badges: ["Implementing Cloud Load Balancing for Compute Engine"],
      },
      {
        name: "Serverless & API Gateway",
        match: [],
        badges: ["Deploy and Secure Serverless APIs with API Gateway"],
      },
      {
        name: "Cloud data · BigQuery",
        match: [],
        badges: [
          "Create and Manage Cloud Spanner Instances",
          "Store, Process, and Manage Data on Google Cloud - Command Line",
          "Create a Streaming Data Lake on Cloud Storage",
          "Create a Secure Data Lake on Cloud Storage",
          "Derive Insights from BigQuery Data",
          "Perform Predictive Data Analysis in BigQuery",
        ],
      },
      { name: "VPS hosting", match: ["Cloud & VPS hosting"] },
      { name: "Azure", match: ["Azure"] },
    ],
  },
];
