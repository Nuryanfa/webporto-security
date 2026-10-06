import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const siteUrl = "https://www.nuryanfa.my.id";
const pages = {
  "/overview": {
    title: "Quick Overview — Muhamad Nur Yanfa",
    description:
      "A concise overview of backend and security projects, engineering experience, and contact channels.",
  },
  "/": {
    title: "Muhamad Nur Yanfa — Backend & Security Engineer",
    description:
      "Portfolio of Muhamad Nur Yanfa, a backend and security engineer building secure APIs, resilient infrastructure, and practical defensive systems.",
  },
  "/archive": {
    title: "Selected Work — Muhamad Nur Yanfa",
    description:
      "Selected backend, security, purple-team, and software quality projects by Muhamad Nur Yanfa.",
  },
  "/timeline": {
    title: "Experience — Muhamad Nur Yanfa",
    description:
      "Engineering experience and field history of backend and security engineer Muhamad Nur Yanfa.",
  },
  "/network": {
    title: "Contact — Muhamad Nur Yanfa",
    description:
      "Contact Muhamad Nur Yanfa for backend engineering, cybersecurity, and secure systems opportunities.",
  },
};

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

export default function TabTitleUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pages[pathname] || {
      title: "Page not found — Muhamad Nur Yanfa",
      description: "The requested page could not be found.",
    };
    const url = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
