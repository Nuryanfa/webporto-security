import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="page-width interior page-heading">
      <span className="eyebrow">404 / Page not found</span>
      <h1>
        A small
        <br />
        <em>wrong turn.</em>
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link className="button" to="/">
        Back to home ↗
      </Link>
    </div>
  );
}
