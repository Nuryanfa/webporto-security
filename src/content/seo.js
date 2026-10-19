// Per-route metadata, shared by the client (TabTitleUpdater) and the build-time
// prerender script that writes one HTML file per route for link previews.
export const siteUrl = "https://www.nuryanfa.my.id";

export const pages = {
  "/": {
    file: "index",
    og: "home",
    title: "Muhamad Nur Yanfa — Backend, Security & DevOps",
    description: "Muhamad Nur Yanfa builds backend systems, security boundaries, and reliable software delivery paths.",
  },
  "/archive": {
    file: "archive",
    og: "archive",
    title: "Projects — Muhamad Nur Yanfa",
    description:
      "Explore AegisGate, TaskForge, SecureNet, Zenith Task Manager, sprint pose analysis, and more engineering projects.",
  },
  "/timeline": {
    file: "timeline",
    og: "timeline",
    title: "Experience — Muhamad Nur Yanfa",
    description:
      "DevOps at Nuansa Teknologi Indonesia, fullstack work on SI MANTAP at Universitas Kebangsaan, and a backend internship at Digitak.",
  },
  "/network": {
    file: "network",
    og: "network",
    title: "Contact — Muhamad Nur Yanfa",
    description: "Contact Muhamad Nur Yanfa about backend engineering, security, DevOps, and technical collaborations.",
  },
  "/overview": {
    file: "overview",
    og: "overview",
    title: "Quick Overview — Muhamad Nur Yanfa",
    description:
      "Backend, security, and DevOps work by Muhamad Nur Yanfa, including selected projects and three engineering roles.",
  },
};

export const notFound = {
  title: "Page not found — Muhamad Nur Yanfa",
  description: "The requested coordinate could not be found.",
};

export const ogImage = (slug) => `${siteUrl}/og/${slug}.png`;
