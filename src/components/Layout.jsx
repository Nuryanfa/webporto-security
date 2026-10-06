import { NavLink, Link } from "react-router-dom";
export default function Layout({ children }) {
  return (
    <div className="site">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="wordmark">
          nur yanfa<span>®</span>
        </Link>
        <nav aria-label="Primary navigation">
          {[
            ["/", "Home"],
            ["/archive", "Work"],
            ["/timeline", "Experience"],
            ["/network", "Contact"],
          ].map(([to, label]) => (
            <NavLink key={to} to={to} end={to === "/"}>
              {label}
            </NavLink>
          ))}
        </nav>
        <a
          className="header-github"
          href="https://github.com/Nuryanfa"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </header>
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <Link className="wordmark" to="/">
          nur yanfa<span>®</span>
        </Link>
        <p>Backend development · Security · Bandung, Indonesia</p>
        <a href="https://github.com/Nuryanfa" target="_blank" rel="noreferrer">
          Find me on GitHub ↗
        </a>
      </footer>
    </div>
  );
}
