// 1200×630 episode title card used for Open Graph images (public/og/*.png).
// Rendered once with a headless browser; re-render if episode titles change.
import { episodes } from "../src/content/episodes.js";
import { pages } from "../src/content/seo.js";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCards() {
  return Object.entries(pages).map(([route, page]) => ({ slug: page.og, html: ogHtml(episodes[route]) }));
}

export function ogHtml(ep) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Shippori+Mincho+B1:wght@800&display=block" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;background:#050403;color:#f3eee6;position:relative;
    font-family:"Barlow Condensed",sans-serif}
  .hex{position:absolute;inset:0;opacity:.6;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97'%3E%3Cpath d='M28 0 56 16v32L28 64 0 48V16Zm0 64v33' fill='none' stroke='%23ff7a00' stroke-opacity='.12'/%3E%3C/svg%3E");
    -webkit-mask-image:radial-gradient(ellipse 70% 80% at 85% 40%,#000,transparent 75%)}
  .glow{position:absolute;inset:auto -10% -45% -10%;height:70%;background:radial-gradient(ellipse at 50% 100%,rgba(255,90,0,.28),transparent 65%)}
  .stripe{position:absolute;left:0;right:0;height:14px;background:repeating-linear-gradient(-45deg,#ff7a00 0 12px,#050403 12px 24px)}
  .top{top:0}.bottom{bottom:0}
  .card{position:absolute;left:84px;top:96px;right:84px}
  .ep{display:inline-block;padding:8px 14px 7px;background:#f3eee6;color:#050403;font-weight:800;font-size:22px;letter-spacing:.24em;text-transform:uppercase}
  .ep b{font-family:"Shippori Mincho B1",serif;letter-spacing:.06em;margin-left:10px}
  .kanji{font-family:"Shippori Mincho B1",serif;font-weight:800;font-size:220px;line-height:1;margin:22px 0 0 -8px;color:#f3eee6}
  .en{font-family:"Shippori Mincho B1",serif;font-weight:800;font-size:64px;text-transform:uppercase;letter-spacing:.04em;color:#ff7a00;margin-top:4px}
  .rule{width:520px;height:3px;background:#f3eee6;margin-top:22px}
  .who{position:absolute;left:84px;bottom:52px;font-weight:700;font-size:24px;letter-spacing:.22em;text-transform:uppercase;color:#aaa197}
  .who b{color:#f3eee6}
  .mark{position:absolute;right:84px;bottom:44px;width:84px;height:84px}
  .mark path{fill:none;stroke:#ff7a00;stroke-width:1.6;stroke-linejoin:round}
</style></head><body>
<div class="hex"></div><div class="glow"></div><div class="stripe top"></div><div class="stripe bottom"></div>
<div class="card">
  <span class="ep">Episode ${ep.no}<b>${ep.ep}</b></span>
  <div class="kanji">${ep.kanji}</div>
  <div class="en">${ep.en}</div>
  <div class="rule"></div>
</div>
<div class="who"><b>Muhamad Nur Yanfa</b> · Backend · Security · DevOps</div>
<svg class="mark" viewBox="0 0 40 40"><path d="M20 2 37 11v18L20 38 3 29V11Z"/><path d="M12 26V14l8 12V14M24 14l4 6 4-6M28 20v6"/></svg>
</body></html>`;
}
