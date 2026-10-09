import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../content/projects';

const siteUrl = 'https://www.nuryanfa.my.id';
const pages = {
  '/overview': { title: 'Quick Overview — Muhamad Nur Yanfa', description: 'Backend, security, and DevOps work by Muhamad Nur Yanfa, including selected projects and three engineering roles.' },
  '/': { title: 'Muhamad Nur Yanfa — Backend, Security & DevOps', description: 'Muhamad Nur Yanfa builds backend systems, security boundaries, and reliable software delivery paths.' },
  '/archive': { title: 'Projects — Muhamad Nur Yanfa', description: 'Explore AegisGate, TaskForge, SecureNet, Zenith Task Manager, sprint pose analysis, and more engineering projects.' },
  '/timeline': { title: 'Experience — Muhamad Nur Yanfa', description: 'DevOps at Nuansa Teknologi Indonesia, fullstack work on SI MANTAP at Universitas Kebangsaan, and a backend internship at Digitak.' },
  '/network': { title: 'Contact — Muhamad Nur Yanfa', description: 'Contact Muhamad Nur Yanfa about backend engineering, security, DevOps, and technical collaborations.' },
};

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', content);
}

export default function TabTitleUpdater() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    const selectedCode = pathname === '/archive'
      ? new URLSearchParams(search).get('project')
      : null;
    const project = projects.find((item) => item.code === selectedCode);
    const page = project
      ? { title: `${project.title} — Muhamad Nur Yanfa`, description: project.summary }
      : pages[pathname] || { title: 'Page not found — Muhamad Nur Yanfa', description: 'The requested coordinate could not be found.' };
    const canonicalUrl = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
    const shareUrl = project ? `${canonicalUrl}?project=${project.code}` : canonicalUrl;
    document.title = page.title;
    setMeta('meta[name="description"]', page.description);
    setMeta('meta[property="og:title"]', page.title);
    setMeta('meta[property="og:description"]', page.description);
    setMeta('meta[property="og:url"]', shareUrl);
    setMeta('meta[name="twitter:title"]', page.title);
    setMeta('meta[name="twitter:description"]', page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
  }, [pathname, search]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}
