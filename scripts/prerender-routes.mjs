// After `vite build`: write one HTML file per route with its own title, description
// and Open Graph image. Link-preview crawlers do not run JavaScript, so these
// static tags are what LinkedIn, WhatsApp and others actually read.
// Served as clean URLs (/archive -> archive.html) via vercel.json "cleanUrls".
import { readFile, writeFile } from "node:fs/promises";
import { ogImage, pages, siteUrl } from "../src/content/seo.js";

const template = await readFile("dist/index.html", "utf8");
const escape = (value) => value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function render(route, page) {
  const url = `${siteUrl}${route === "/" ? "/" : route}`;
  const image = ogImage(page.og);
  let html = template;
  const swap = (pattern, value) => {
    if (!pattern.test(html)) throw new Error(`prerender: tag not found for ${pattern}`);
    html = html.replace(pattern, (_, open, close) => `${open}${escape(value)}${close}`);
  };
  swap(/(<title>)[^<]*(<\/title>)/, page.title);
  swap(/(<meta name="description" content=")[^"]*(")/, page.description);
  swap(/(<link rel="canonical" href=")[^"]*(")/, url);
  swap(/(<meta property="og:url" content=")[^"]*(")/, url);
  swap(/(<meta property="og:title" content=")[^"]*(")/, page.title);
  swap(/(<meta property="og:description" content=")[^"]*(")/, page.description);
  swap(/(<meta property="og:image" content=")[^"]*(")/, image);
  swap(/(<meta property="og:image:alt" content=")[^"]*(")/, `Title card — ${page.title}`);
  swap(/(<meta name="twitter:title" content=")[^"]*(")/, page.title);
  swap(/(<meta name="twitter:description" content=")[^"]*(")/, page.description);
  swap(/(<meta name="twitter:image" content=")[^"]*(")/, image);
  swap(/(<meta name="twitter:image:alt" content=")[^"]*(")/, `Title card — ${page.title}`);
  return html;
}

for (const [route, page] of Object.entries(pages)) {
  await writeFile(`dist/${page.file}.html`, render(route, page));
  console.log(`prerendered ${route} -> dist/${page.file}.html`);
}
