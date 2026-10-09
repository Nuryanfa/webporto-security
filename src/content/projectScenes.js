// Concept maps summarize the existing project descriptions; they are not
// presented as implementation diagrams or screenshots.
export const projectScenes = {
  AEGIS: [
    { title: "Route", detail: "Match requests against bounded routes before forwarding them to an upstream." },
    { title: "Protect", detail: "Apply configured API-client auth, Redis rate limiting, and bounded WAF checks." },
    { title: "Operate", detail: "Observe traffic and distribute validated configuration snapshots through the control plane." },
  ],
  TFGE: [
    { title: "Model", detail: "Define explicit job and attempt states before introducing workers." },
    { title: "Persist", detail: "Use PostgreSQL as the planned source of truth for durable job execution." },
    { title: "Recover", detail: "Plan retries, leases, and failure recovery as later milestones; they are not shipped in the current foundation." },
  ],
  SNET: [
    { title: "Segment", detail: "Define network boundaries and access paths for the enterprise lab." },
    { title: "Simulate", detail: "Exercise the environment with MITRE ATT&CK-mapped scenarios." },
    { title: "Observe", detail: "Use Wazuh and Suricata signals to inform defensive refinement." },
  ],
  ZEN: [
    { title: "Plan", detail: "Organize work on a Kanban board with priorities and calendar context." },
    { title: "Focus", detail: "Pair task work with configurable Pomodoro sessions and quick notes." },
    { title: "Progress", detail: "Use XP, levels, and streaks to make completed work visible." },
  ],
  POSE: [
    { title: "Capture", detail: "Process camera or video input for markerless pose estimation." },
    { title: "Analyze", detail: "Derive sprint-related movement metrics from body landmarks." },
    { title: "Review", detail: "Present athlete sessions and trends through the web dashboard." },
  ],
  X509: [
    { title: "Receive", detail: "Accept a certificate validation request at a defined service boundary." },
    { title: "Establish trust", detail: "Keep key management and trust decisions explicit in the architecture." },
    { title: "Record decision", detail: "Represent validation outcomes as auditable states." },
  ],
  SQA: [
    { title: "Critical path", detail: "Identify commerce and transaction flows that deserve focused testing." },
    { title: "Repeat tests", detail: "Organize quality checks into a workflow that can be run consistently." },
    { title: "Delivery", detail: "Use test feedback to support safer iteration and release decisions." },
  ],
};
