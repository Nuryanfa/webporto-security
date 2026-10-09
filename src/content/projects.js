import { Activity, Crosshair, Layers3, ListTodo, Shield, Workflow, Zap } from "lucide-react";

// Claims for the four new projects follow their public repository READMEs.
// Status labels distinguish released work, early foundations, and development.
export const projects = [
  {
    id: "OP-01", code: "AEGIS", type: "SECURE INFRASTRUCTURE",
    title: "AegisGate", status: "V0.8 RELEASED",
    summary: "A Go API gateway exploring request security, distributed configuration, and resilient traffic management.",
    outcome: "The v0.8 portfolio release combines reverse proxying, Redis-backed limits, bounded WAF inspection, observability, and a gRPC control plane. It is production-like, not production-ready.",
    tags: ["Go", "gRPC", "Redis", "Prometheus", "OpenTelemetry"],
    href: "https://github.com/Nuryanfa/AegisGate", icon: Shield, color: "#79e6df",
  },
  {
    id: "OP-02", code: "TFGE", type: "DISTRIBUTED SYSTEMS",
    title: "TaskForge", status: "V0.1 FOUNDATION",
    summary: "An educational Go platform for durable background jobs and workflow orchestration, designed around failure recovery and idempotency.",
    outcome: "The current repository contains a job state model, initial PostgreSQL schema, HTTP health scaffold, Docker Compose setup, and CI. Workers and database-backed execution remain planned work.",
    tags: ["Go", "PostgreSQL", "Docker", "Job state machine"],
    href: "https://github.com/Nuryanfa/TaskForge", icon: Workflow, color: "#d5e890",
  },
  {
    id: "OP-03", code: "SNET", type: "PURPLE TEAM",
    title: "SecureNet Enterprise Lab", status: "DEPLOYED LAB",
    summary: "An enterprise network laboratory designed to be built, attacked, observed, and continuously hardened.",
    outcome: "Six versioned releases combining segmentation, detection engineering, and MITRE ATT&CK–mapped simulations.",
    tags: ["MikroTik", "Wazuh", "Suricata", "MITRE ATT&CK"],
    href: "https://github.com/Nuryanfa/securenet-enterprise-lab", icon: Layers3, color: "#8ab9ff",
  },
  {
    id: "OP-04", code: "ZEN", type: "FULLSTACK PRODUCT",
    title: "Zenith Task Manager", status: "REPOSITORY",
    summary: "A MERN task-management application combining Kanban planning, focus sessions, and gamified progress.",
    outcome: "The repository documents drag-and-drop tasks, a Pomodoro focus mode, calendar and notes views, plus authentication and responsive layouts.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    href: "https://github.com/Nuryanfa/TaskManager", icon: ListTodo, color: "#e8f53b",
  },
  {
    id: "OP-05", code: "POSE", type: "COMPUTER VISION",
    title: "Smart Sprint Training System", status: "IN DEVELOPMENT",
    summary: "A sprint-training analysis project using markerless pose estimation and a web dashboard for athlete data.",
    outcome: "The repository describes Python-based pose processing with MediaPipe and OpenCV, a FastAPI backend, and a React dashboard for session analysis.",
    tags: ["Python", "MediaPipe", "FastAPI", "React"],
    href: "https://github.com/Nuryanfa/DeteksiPose-Lari", icon: Activity, color: "#f5a5a7",
  },
  {
    id: "OP-06", code: "X509", type: "BACKEND ARCHITECTURE",
    title: "Certificate Validation System", status: "PROTOTYPE",
    summary: "A secure service concept for validating X.509 certificates with explicit trust boundaries and scalable data flow.",
    outcome: "Architecture centered on managed keys, auditable validation states, and zero-trust decisions.",
    tags: ["Go", "PostgreSQL", "Cloud KMS", "X.509"],
    href: "https://github.com/Nuryanfa", icon: Zap, color: "#e9cf88",
  },
  {
    id: "OP-07", code: "SQA", type: "QUALITY ENGINEERING",
    title: "E-Commerce SQA", status: "ARCHIVED",
    summary: "Quality engineering for an e-commerce platform covering secure transaction paths and repeatable test workflows.",
    outcome: "A clearer test strategy for critical commerce flows and safer delivery practices.",
    tags: ["Golang", "SQA", "Testing", "CI/CD"],
    href: "https://github.com/Nuryanfa/e-commerse-sqa", icon: Crosshair, color: "#ff4d5e",
  },
];
