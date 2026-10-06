import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const experience = [
  {
    date: "2026 — Present",
    role: "Backend Engineer Intern",
    place: "Digitak Labs",
    description:
      "Building backend systems for a food delivery product, with a focus on API development, relational data design, and collaborative delivery.",
    tags: ["API development", "Database design", "GitLab workflows"],
  },
  {
    date: "May 2026",
    role: "Development Team",
    place: "SI MANTAP",
    description:
      "Contributed student guidance features to a university management application, working with the team through implementation and quality-focused iteration.",
    tags: ["Feature development", "Team collaboration", "Quality assurance"],
  },
];
export default function Timeline() {
  return (
    <div className="page-width interior">
      <header className="page-heading">
        <span className="eyebrow">02 / Experience</span>
        <h1>
          Learning through
          <br />
          <em>real work.</em>
        </h1>
        <p>
          The teams, products, and practical challenges that shape how I
          approach engineering.
        </p>
      </header>
      <div className="experience-list">
        {experience.map((item, index) => (
          <article key={item.place}>
            <div className="experience-date">
              <span>0{index + 1}</span>
              {item.date}
            </div>
            <div>
              <span className="eyebrow">{item.place}</span>
              <h2>{item.role}</h2>
              <p>{item.description}</p>
              <div className="tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="interior-end">
        <p>More of my engineering practice lives in my projects.</p>
        <Link className="text-link" to="/archive">
          Explore selected work
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  );
}
