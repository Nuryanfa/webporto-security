import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import DecodeText from "../components/DecodeText";
import SplitReveal from "../components/luxe/SplitReveal";

export default function NotFound() {
  return (
    <AnimatedPage>
      <section className="lx-page lx-404">
        <div className="lx-hazard" aria-hidden="true" />
        <span className="lx-404__alert" data-reveal>
          <span lang="ja">警告</span> Warning — signal lost
        </span>
        <span className="lx-404__kanji" lang="ja" aria-hidden="true" data-reveal>
          信号途絶
        </span>
        <SplitReveal as="h1" type="lines" trigger="intro" delay={0.15} className="lx-404__code">
          404
        </SplitReveal>
        <p data-reveal>
          <DecodeText text="SIGNAL LOST" /> — the requested coordinate does not exist or has moved
          outside this network.
        </p>
        <Link to="/" className="lx-btn lx-btn--primary" data-reveal>
          <ArrowLeft size={18} />
          <span>Return to base</span>
        </Link>
        <div className="lx-hazard" aria-hidden="true" />
      </section>
    </AnimatedPage>
  );
}
