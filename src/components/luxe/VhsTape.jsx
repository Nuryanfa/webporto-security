/**
 * Flat VHS cassette: orange label with a hazard stripe, a corner sticker and two
 * spinning reels. Sizes itself to its container, so the intro and the
 * "next episode" card share one drawing.
 */
export default function VhsTape({ title, subtitle, sticker, className = "" }) {
  return (
    <div className={`lx-vhs ${className}`} aria-hidden="true">
      <span className="lx-vhs__label">
        <b>{title}</b>
        <small>{subtitle}</small>
        <em>{sticker}</em>
      </span>
      <span className="lx-vhs__window">
        <i />
        <i />
      </span>
    </div>
  );
}
