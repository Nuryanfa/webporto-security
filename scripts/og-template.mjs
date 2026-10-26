// 1200×630 episode title card used for Open Graph images (public/og/*.png).
// Rendered once with a headless browser; re-render if episode titles change.
import { episodes } from "../src/content/episodes.js";
import { pages } from "../src/content/seo.js";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCards() {
  return Object.entries(pages).map(([route, page]) => ({ slug: page.og, html: ogHtml(episodes[route]) }));
}

export function ogHtml(ep) {
  const n = [...ep.kanji].length;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;1,800&family=JetBrains+Mono:wght@700&family=Shippori+Mincho+B1:wght@800&display=block" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;overflow:hidden;position:relative;color:#f4f4f0;font-family:"Barlow Condensed",sans-serif;
    background:radial-gradient(circle,rgba(244,244,240,.07) 1px,transparent 1.4px) 0 0/14px 14px,
      radial-gradient(ellipse at 20% 110%,rgba(255,107,26,.22),transparent 60%),#0b0b0e}
  .tape-strip{position:absolute;left:0;right:0;bottom:0;height:16px;background:repeating-linear-gradient(-45deg,#ff6b1a 0 14px,#0b0b0e 14px 28px)}
  .card{position:absolute;left:72px;top:70px}
  .ep{display:inline-block;padding:9px 16px 8px;background:#ffd23f;color:#0b0b0e;font-weight:800;font-size:24px;letter-spacing:.2em;text-transform:uppercase;transform:rotate(-2deg)}
  .ep b{font-family:"Shippori Mincho B1",serif;letter-spacing:.06em;margin-left:12px}
  .kanji{position:relative;isolation:isolate;display:inline-block;margin-top:26px;padding:6px 26px 14px;font:800 ${n > 2 ? 150 : 190}px/1 "Shippori Mincho B1",serif;color:#0b0b0e}
  .kanji::before{content:"";position:absolute;inset:0;z-index:-1;background:#ff6b1a;transform:skewX(-8deg);box-shadow:10px 10px 0 #ffd23f}
  .en{margin-top:22px;font:italic 800 92px/.9 "Barlow Condensed",sans-serif;text-transform:uppercase}
  .tv{position:absolute;right:70px;top:96px;width:400px;border:3px solid #f4f4f0;border-radius:24px/28px;background:#141419;transform:rotate(2deg);box-shadow:14px 14px 0 #ffd23f;overflow:hidden}
  .bar{display:flex;justify-content:space-between;padding:12px 18px 10px;border-bottom:2px solid rgba(244,244,240,.16);font-weight:800;font-size:17px;letter-spacing:.2em;text-transform:uppercase;color:#a3a3ad}
  .bar span:first-child{color:#f4f4f0}.bar i{display:inline-block;width:10px;height:10px;border-radius:50%;background:#ff3b4e;margin-right:8px}
  .screen{position:relative;margin:12px;padding:34px 30px 38px;border-radius:16px/20px;background:radial-gradient(ellipse at 50% 45%,#1c1c23,#08080a 75%)}
  .screen::after{content:"";position:absolute;inset:0;border-radius:inherit;background:repeating-linear-gradient(0deg,rgba(0,0,0,.25) 0 1px,transparent 1px 3px)}
  .vhs{position:relative;padding:22px 22px 0;border:3px solid #f4f4f0;border-radius:14px;background:#2b2b34;box-shadow:8px 8px 0 #ffd23f;transform:rotate(-3deg)}
  .label{position:relative;padding:12px 16px 22px;color:#0b0b0e;background:repeating-linear-gradient(-45deg,#0b0b0e 0 8px,#ff6b1a 8px 16px) bottom/100% 10px no-repeat,#ff6b1a}
  .label b{display:block;font:italic 800 56px/.9 "Barlow Condensed",sans-serif}
  .label small{font-weight:800;font-size:15px;letter-spacing:.14em;text-transform:uppercase}
  .label em{position:absolute;top:12px;right:12px;padding:4px 9px;background:#ffd23f;font:800 15px/1 "Barlow Condensed";font-style:normal;transform:rotate(-4deg)}
  .win{display:flex;justify-content:space-around;width:62%;margin:18px auto 22px;padding:8px 0;border-radius:8px;background:#08080a}
  .win i{width:44px;height:44px;border-radius:50%;border:10px solid #2a160b;background:#8c8c97}
  .who{position:absolute;left:72px;bottom:46px;font-weight:800;font-size:26px;letter-spacing:.16em;text-transform:uppercase;color:#a3a3ad}
  .who b{color:#f4f4f0}
  .url{position:absolute;right:72px;bottom:48px;font:700 20px/1 "JetBrains Mono",monospace;color:#ffd23f}
</style></head><body>
<div class="card">
  <span class="ep">Episode ${ep.no}<b>${ep.ep}</b></span><br>
  <span class="kanji">${ep.kanji}</span>
  <div class="en">${ep.en}</div>
</div>
<div class="tv">
  <div class="bar"><span><i></i>CH.${ep.no} · Live</span><span>Now playing</span></div>
  <div class="screen"><div class="vhs">
    <div class="label"><b>NY-07</b><small>Backend · Security · DevOps</small><em>▶ REC</em></div>
    <div class="win"><i></i><i></i></div>
  </div></div>
</div>
<div class="who"><b>Muhamad Nur Yanfa</b> · Backend · Security · DevOps · Cloud</div>
<div class="url">nuryanfa.vercel.app</div>
<div class="tape-strip"></div>
</body></html>`;
}
