// Concept maps and architectural decision records (ADRs) for each engineering project.
export const projectScenes = {
  AEGIS: [
    {
      title: "Route",
      detail: "Match requests against bounded routes before forwarding them to an upstream.",
      tradeoff: "Bounded path routing prevents catastrophic regular-expression backtracking in the reverse proxy layer.",
    },
    {
      title: "Protect",
      detail: "Apply configured API-client auth, Redis rate limiting, and bounded WAF checks.",
      tradeoff: "Redis token-bucket algorithm selected over leaky-bucket to accommodate predictable burst traffic safely.",
    },
    {
      title: "Operate",
      detail: "Observe traffic and distribute validated configuration snapshots through the control plane.",
      tradeoff: "Hot configuration updates distributed via gRPC control plane without restarting active proxy workers.",
    },
  ],
  TFGE: [
    {
      title: "Model",
      detail: "Define explicit job and attempt states before introducing workers.",
      tradeoff: "Strict finite-state machine (pending -> leased -> running -> completed) guarantees idempotency under network partitions.",
    },
    {
      title: "Persist",
      detail: "Use PostgreSQL as the planned source of truth for durable job execution.",
      tradeoff: "Transactional relational schema with row-level locks selected over in-memory queues for durable audit logs.",
    },
    {
      title: "Recover",
      detail: "Plan retries, leases, and failure recovery as later milestones; they are not shipped in the current foundation.",
      tradeoff: "Exponential backoff retry policy minimizes cascading failures on external dependencies.",
    },
  ],
  SNET: [
    {
      title: "Segment",
      detail: "Define network boundaries and access paths for the enterprise lab.",
      tradeoff: "Zero-Trust VLAN isolation on MikroTik confines breach radius to DMZ and halts lateral pivoting.",
    },
    {
      title: "Simulate",
      detail: "Exercise the environment with MITRE ATT&CK-mapped scenarios.",
      tradeoff: "Mapping real adversary tactics (T1059, T1046) ensures defensive rules match active threat models.",
    },
    {
      title: "Observe",
      detail: "Use Wazuh and Suricata signals to inform defensive refinement.",
      tradeoff: "Dual-engine defense: Suricata handles raw packet anomalies while Wazuh correlates host log events.",
    },
  ],
  ZEN: [
    {
      title: "Plan",
      detail: "Organize work on a Kanban board with priorities and calendar context.",
      tradeoff: "Normalized board state minimizes re-renders during high-frequency drag-and-drop operations.",
    },
    {
      title: "Focus",
      detail: "Pair task work with configurable Pomodoro sessions and quick notes.",
      tradeoff: "Local-first storage fallback preserves focus session integrity during intermittent offline states.",
    },
    {
      title: "Progress",
      detail: "Use XP, levels, and streaks to make completed work visible.",
      tradeoff: "Deterministic XP calculation prevents desync between client timers and server records.",
    },
  ],
  POSE: [
    {
      title: "Capture",
      detail: "Process camera or video input for markerless pose estimation.",
      tradeoff: "Local video frame downsampling maintains 60 FPS processing pipeline on standard hardware.",
    },
    {
      title: "Analyze",
      detail: "Derive sprint-related movement metrics from body landmarks.",
      tradeoff: "Vectorized coordinate math reduces CPU overhead when calculating joint angles and stride cadence.",
    },
    {
      title: "Review",
      detail: "Present athlete sessions and trends through the web dashboard.",
      tradeoff: "Time-series aggregation optimizes dashboard loading for multi-session trend analysis.",
    },
  ],
  X509: [
    {
      title: "Receive",
      detail: "Accept a certificate validation request at a defined service boundary.",
      tradeoff: "Strict schema validation at service edge rejects malformed ASN.1 payloads prior to cryptography ops.",
    },
    {
      title: "Establish trust",
      detail: "Keep key management and trust decisions explicit in the architecture.",
      tradeoff: "Decoupled KMS trust root enables seamless cryptographic rotation without client downtime.",
    },
    {
      title: "Record decision",
      detail: "Represent validation outcomes as auditable states.",
      tradeoff: "Immutable append-only validation audit log guarantees compliance and forensic readiness.",
    },
  ],
  SQA: [
    {
      title: "Critical path",
      detail: "Identify commerce and transaction flows that deserve focused testing.",
      tradeoff: "Prioritizing checkout and payment idempotency tests maximizes business protection with minimal test suite bloat.",
    },
    {
      title: "Repeat tests",
      detail: "Organize quality checks into a workflow that can be run consistently.",
      tradeoff: "Containerized hermetic test environments prevent flaky test passes caused by host drift.",
    },
    {
      title: "Delivery",
      detail: "Use test feedback to support safer iteration and release decisions.",
      tradeoff: "Automated regression gates in CI block deployments with failing end-to-end user journeys.",
    },
  ],
};
