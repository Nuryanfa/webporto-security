import { monologue } from "../../content/monologue";

/** One black frame holding every question and answer. */
export default function Monologue() {
  return (
    <section className="lx-mono" aria-label="Monologue">
      <ol className="lx-mono__list">
        {monologue.map((frame, i) => (
          <li key={frame.q} className="lx-mono__frame" data-reveal>
            <span className="lx-mono__count" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="lx-mono__q">{frame.q}</p>
            <p className="lx-mono__a">{frame.a}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
