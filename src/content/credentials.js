// Google Skills (Google Cloud) public profile. Titles and dates copied from the profile;
// only cloud-relevant skill badges are highlighted, the total counts every badge earned.
export const googleSkills = {
  url: "https://www.skills.google/public_profiles/7e1b2448-d30c-499f-a889-034966a54a1b",
  label: "Google Skills",
  total: 23,
  league: "Bronze League · 588 points",
  groups: [
    {
      id: "network",
      title: "Networking, IAM & security",
      badges: [
        { title: "Privileged Access with IAM", date: "2026-08-05" },
        { title: "Connecting Cloud Networks with NCC", date: "2026-08-13" },
        { title: "Arcade Simulator: Network Security Engineer", date: "2026-08-13" },
        { title: "Create a Secure Data Lake on Cloud Storage", date: "2026-09-12" },
      ],
    },
    {
      id: "compute",
      title: "Compute, serverless & delivery",
      badges: [
        { title: "Implementing Cloud Load Balancing for Compute Engine", date: "2026-09-28" },
        { title: "Deploy and Secure Serverless APIs with API Gateway", date: "2026-08-25" },
        { title: "Implement CI/CD Pipelines on Google Cloud", date: "2026-08-24" },
        { title: "Monitoring in Google Cloud", date: "2026-08-31" },
      ],
    },
    {
      id: "data",
      title: "Data platforms",
      badges: [
        { title: "Create and Manage Cloud Spanner Instances", date: "2026-08-25" },
        { title: "Store, Process, and Manage Data on Google Cloud - Command Line", date: "2026-09-18" },
        { title: "Create a Streaming Data Lake on Cloud Storage", date: "2026-09-11" },
        { title: "Derive Insights from BigQuery Data", date: "2026-09-13" },
        { title: "Perform Predictive Data Analysis in BigQuery", date: "2026-09-13" },
        { title: "Organize and Govern Data with Knowledge Catalog", date: "2026-08-30" },
      ],
    },
  ],
};

export const allBadges = googleSkills.groups.flatMap((group) => group.badges);

export function formatBadgeDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
