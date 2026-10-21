import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ContentTransition from "../ContentTransition";
import { loadout } from "../../content/capabilities";
import { projects } from "../../content/projects";
import { experiences } from "../../content/experience";
import { statusTone } from "../../content/episodes";
import { allBadges, formatBadgeDate, googleSkills } from "../../content/credentials";
import { playTacticalBlip } from "../../utils/audioTelemetry";

// Every link shown is derived from tags in the content files, never hand-written.
function evidenceFor(tool) {
  const hit = (tags) => tags.some((tag) => tool.match.includes(tag));
  const badges =
    tool.badges === "all" ? allBadges : allBadges.filter((badge) => (tool.badges || []).includes(badge.title));
  return {
    ops: projects.filter((p) => hit(p.tags)),
    records: experiences.filter((e) => hit(e.tags)),
    badges,
  };
}

export default function Loadout() {
  const index = useMemo(
    () =>
      loadout.flatMap((slot, si) =>
        slot.tools.map((tool) => ({ ...tool, slot, si, ...evidenceFor(tool) })),
      ),
    [],
  );
  const [selected, setSelected] = useState(index[0].name);
  const current = index.find((t) => t.name === selected);

  const equip = (name) => {
    if (name === selected) return;
    playTacticalBlip(1040, 0.03);
    setSelected(name);
  };

  return (
    <div className="lx-loadout">
      <div className="lx-loadout__slots">
        {loadout.map((slot, si) => (
          <div key={slot.slot} className="lx-slot" data-reveal>
            <div className="lx-slot__head">
              <span className="lx-slot__kanji" lang="ja">
                {slot.kanji}
              </span>
              <span className="lx-slot__name">{slot.slot}</span>
              <small>Slot 0{si + 1}</small>
            </div>
            <ul className="lx-slot__tools">
              {index
                .filter((tool) => tool.si === si)
                .map((tool) => {
                  const count = tool.ops.length + tool.records.length + tool.badges.length;
                  return (
                    <li key={tool.name}>
                      <button
                        type="button"
                        className="lx-tool"
                        aria-pressed={selected === tool.name}
                        onPointerEnter={(e) => e.pointerType === "mouse" && equip(tool.name)}
                        onFocus={() => equip(tool.name)}
                        onClick={() => equip(tool.name)}
                      >
                        <span className="lx-tool__name">{tool.name}</span>
                        <span className="lx-tool__count">
                          <span aria-hidden="true">×{count}</span>
                          <span className="sr-only">, {count} linked entries</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>

      <aside className="lx-readout" aria-live="polite" data-reveal>
        <div className="lx-readout__bar">
          <span>Equipment readout</span>
          <span lang="ja">装備情報</span>
        </div>
        <ContentTransition id={current.name} className="lx-readout__body">
          <span className="lx-readout__slot" data-stagger>
            <span lang="ja">{current.slot.kanji}</span> Slot 0{current.si + 1} · {current.slot.slot}
          </span>
          <h3 className="lx-readout__name" data-stagger>
            {current.name}
          </h3>
          <p className="lx-readout__meta" data-stagger>
            {current.ops.length + current.records.length + current.badges.length === 0
              ? "Lab & self-study — no public project yet"
              : [
                  current.ops.length && `${current.ops.length} operation${current.ops.length === 1 ? "" : "s"}`,
                  current.records.length &&
                    `${current.records.length} field record${current.records.length === 1 ? "" : "s"}`,
                  current.badges.length &&
                    `${current.badges.length} verified badge${current.badges.length === 1 ? "" : "s"}`,
                ]
                  .filter(Boolean)
                  .join(" · ")}
          </p>
          <ul className="lx-readout__list" data-stagger>
            {current.ops.map((p) => (
              <li key={p.code}>
                <Link to={`/archive?project=${p.code}`} className={`tone-${statusTone(p.status)}`}>
                  <span className="lx-readout__code">{p.code}</span>
                  <span className="lx-readout__title">{p.title}</span>
                  <small>{p.status}</small>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </li>
            ))}
            {current.records.map((e) => (
              <li key={e.id}>
                <Link to="/timeline" className="tone-info">
                  <span className="lx-readout__code">REC</span>
                  <span className="lx-readout__title">
                    {e.role} — {e.place}
                  </span>
                  <small>{e.coordinate}</small>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </li>
            ))}
            {current.badges.slice(0, 6).map((badge) => (
              <li key={badge.title}>
                <a href={googleSkills.url} target="_blank" rel="noreferrer" className="tone-go">
                  <span className="lx-readout__code">BADGE</span>
                  <span className="lx-readout__title">{badge.title}</span>
                  <small>{formatBadgeDate(badge.date)}</small>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          {current.badges.length > 6 && (
            <a className="lx-readout__more" href={googleSkills.url} target="_blank" rel="noreferrer" data-stagger>
              +{current.badges.length - 6} more on Google Skills <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </ContentTransition>
      </aside>
    </div>
  );
}
