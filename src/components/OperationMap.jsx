import { useState } from "react";
import { projectScenes } from "../content/projectScenes";

export default function OperationMap({ code }) {
  const stages = projectScenes[code];
  const [selected, setSelected] = useState(0);

  return (
    <section className="operation-map" aria-label={`${code} concept map`}>
      <div className="operation-map-heading">
        <span>MISSION SCHEMATIC</span>
        <span>CONCEPT MAP / 03 STAGES</span>
      </div>
      <div className="operation-map-stages" role="group" aria-label="Inspect a stage">
        {stages.map((stage, index) => (
          <button
            key={stage.title}
            type="button"
            className={selected === index ? "is-active" : ""}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span className="operation-map-marker">0{index + 1}</span>
            <span>{stage.title}</span>
          </button>
        ))}
      </div>
      <div className="operation-map-detail" aria-live="polite">
        <span>INSPECTED STAGE / 0{selected + 1}</span>
        <p>{stages[selected].detail}</p>
      </div>
      <p className="operation-map-note">
        {code === "X509"
          ? "Conceptual overview. A dedicated source repository is not linked yet."
          : "Conceptual overview based on the project summary. Inspect the linked repository for implementation detail."}
      </p>
    </section>
  );
}
