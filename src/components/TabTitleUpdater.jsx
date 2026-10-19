import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../content/projects";
import { notFound, ogImage, pages, siteUrl } from "../content/seo";

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

// Keeps title and meta in sync for in-app navigation. Link previews come from
// the per-route HTML written at build time (scripts/prerender-routes.mjs).
// Scroll reset is owned by RouteTransition, which does it behind the curtain.
export default function TabTitleUpdater() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const selectedCode = pathname === "/archive" ? new URLSearchParams(search).get("project") : null;
    const project = projects.find((item) => item.code === selectedCode);
    const route = pages[pathname];
    const page = project
      ? { title: `${project.title} — Muhamad Nur Yanfa`, description: project.summary }
      : route || notFound;
    const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;
    const shareUrl = project ? `${canonicalUrl}?project=${project.code}` : canonicalUrl;
    const image = ogImage(route?.og || "home");
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', shareUrl);
    setMeta('meta[property="og:image"]', image);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    setMeta('meta[name="twitter:image"]', image);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalUrl);
  }, [pathname, search]);
  return null;
}
