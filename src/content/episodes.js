// Anime framing for each route: every page is an "episode" with a kanji title card.
export const episodes = {
  "/": { no: "01", ep: "第壱話", kanji: "起動", reading: "KIDŌ", en: "System Online", label: "Home", subtitle: "Agent NY-07, on the line." },
  "/archive": { no: "02", ep: "第弐話", kanji: "作戦", reading: "SAKUSEN", en: "Operations", label: "Work", subtitle: "Seven operations on file. Select a target." },
  "/timeline": { no: "03", ep: "第参話", kanji: "経歴", reading: "KEIREKI", en: "Trace", label: "Experience", subtitle: "Field records decrypted." },
  "/network": { no: "04", ep: "第四話", kanji: "通信", reading: "TSŪSHIN", en: "Channel", label: "Contact", subtitle: "Channel open. Awaiting your signal." },
  "/overview": { no: "05", ep: "第伍話", kanji: "概要", reading: "GAIYŌ", en: "Brief", label: "Overview", subtitle: "Agent file unlocked." },
};

export const lostEpisode = {
  no: "??",
  ep: "番外編",
  kanji: "信号途絶",
  reading: "SHINGŌ TOZETSU",
  en: "Signal Lost",
  label: "Not found",
};

export function episodeFor(pathname) {
  return episodes[pathname] || lostEpisode;
}

// "Next episode" preview order used by the footer.
const sequence = ["/", "/archive", "/timeline", "/network"];
export function nextEpisode(pathname) {
  const index = sequence.indexOf(pathname);
  const to = sequence[(index + 1) % sequence.length];
  return { to, ...episodes[to] };
}

// Status labels mapped to a signal tone instead of per-project pastel colours.
export function statusTone(status = "") {
  const s = status.toLowerCase();
  if (s.includes("released") || s.includes("deployed")) return "go";
  if (s.includes("archived")) return "dim";
  if (s.includes("development")) return "warn";
  if (s.includes("prototype") || s.includes("foundation")) return "amber";
  return "info";
}
