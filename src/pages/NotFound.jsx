import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import SplitReveal from "../components/luxe/SplitReveal";

export default function NotFound() {
  return (
    <AnimatedPage>
      <section className="lx-page lx-404">
        <span className="lx-eyebrow" data-reveal>
          Error — coordinate lost
        </span>
        <SplitReveal as="h1" type="lines" trigger="intro" delay={0.15} className="lx-404__code">
          404
        </SplitReveal>
        <p data-reveal>The requested signal does not exist or has moved outside this network.</p>
        <Link to="/" className="lx-btn lx-btn--primary" data-reveal>
          <ArrowLeft size={18} />
          <span>Return home</span>
        </Link>
      </section>
    </AnimatedPage>
  );
}
