import { Activity, Braces, Database, GitBranch, Layers3, ServerCog } from "lucide-react";

export const experiences = [
  {
    id: "NTI",
    coordinate: "CURRENT",
    role: "DevOps Engineer",
    place: "Nuansa Teknologi Indonesia (NTI)",
    description:
      "Delivering web applications to production, shaping the team's code workflow through CI/CD pipelines, and setting up servers and hosting environments.",
    events: [
      { icon: ServerCog, text: "Production server and hosting setup" },
      { icon: GitBranch, text: "Team code workflow and CI/CD pipelines" },
      { icon: Activity, text: "Web application delivery to production" },
    ],
    tags: ["DevOps", "CI/CD", "Server setup", "Production delivery"],
  },
  {
    id: "SIMANTAP",
    coordinate: "UNIVERSITY",
    role: "Fullstack Developer",
    place: "Universitas Kebangsaan · SI MANTAP",
    description:
      "Contributed fullstack work to SI MANTAP, a university management application, including student guidance features in a collaborative delivery process.",
    events: [
      { icon: Braces, text: "Fullstack feature development" },
      { icon: Layers3, text: "Student guidance workflow" },
      { icon: GitBranch, text: "Team implementation" },
    ],
    tags: ["Fullstack", "Product", "Collaboration"],
  },
  {
    id: "DIGITAK",
    coordinate: "INTERNSHIP",
    role: "Backend Engineer Intern",
    place: "Digitak Labs",
    description:
      "Worked on backend features for a food-delivery product, spanning API development, relational data design, and GitLab delivery workflows.",
    events: [
      { icon: Braces, text: "Backend feature development" },
      { icon: Database, text: "Relational data design" },
      { icon: GitBranch, text: "GitLab delivery workflows" },
    ],
    tags: ["Backend", "API", "GitLab CI/CD"],
  },
];
