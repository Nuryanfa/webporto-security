/**
 * Episode title card in the Eva manner: a horizontally compressed kanji block
 * pinned to the left, its reading set vertically beside it, and the English
 * title squeezed right under the corner, forming an L. Each line sits in its
 * own mask so the curtain / preloader timelines can rise it into view.
 */
export default function TitleCard({ episode, maskClass }) {
  return (
    <>
      <span className={`${maskClass} lx-tc lx-tc--ep`}>
        <span className="lx-title-card__ep">
          Episode {episode.no} <span lang="ja">{episode.ep}</span>
        </span>
      </span>
      <span className={`${maskClass} lx-tc lx-tc--kanji`}>
        <span className="lx-title-card__kanji" lang="ja" style={{ "--n": [...episode.kanji].length }}>
          <span>{episode.kanji}</span>
        </span>
      </span>
      <span className={`${maskClass} lx-tc lx-tc--read`}>
        <span className="lx-title-card__read">{episode.reading}</span>
      </span>
      <span className={`${maskClass} lx-tc lx-tc--en`}>
        <span className="lx-title-card__en">{episode.en}</span>
      </span>
    </>
  );
}
