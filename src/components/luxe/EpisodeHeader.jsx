import { useLocation } from "react-router-dom";
import SplitReveal from "./SplitReveal";
import { episodeFor } from "../../content/episodes";

// Inner-page masthead laid out like an anime title card.
export default function EpisodeHeader({ eyebrow, children, lede, extra }) {
  const { pathname } = useLocation();
  const episode = episodeFor(pathname);
  return (
    <header className="lx-page-head">
      <div className="lx-page-head__top" data-reveal>
        <span className="lx-ep-tag">
          Episode {episode.no} <span lang="ja">{episode.ep}</span>
        </span>
        <span className="lx-eyebrow">{eyebrow}</span>
        {extra}
      </div>
      <div className="lx-page-head__title">
        <span
          className="lx-page-head__kanji"
          lang="ja"
          aria-hidden="true"
          data-reveal
          style={{ "--n": [...episode.kanji].length }}
        >
          <span>{episode.kanji}</span>
        </span>
        <div>
          <span className="lx-page-head__reading" data-reveal>
            {episode.reading} — {episode.en}
          </span>
          <SplitReveal as="h1" type="chars" trigger="intro" delay={0.15} className="lx-display">
            {children}
          </SplitReveal>
        </div>
      </div>
      {lede && (
        <p className="lx-page-head__lede" data-reveal>
          {lede}
        </p>
      )}
    </header>
  );
}
