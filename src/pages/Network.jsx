import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
export default function Network() {
  const email = "muhamadnuryanfa@gmail.com";
  const [status, setStatus] = useState("");
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied");
    } catch {
      setStatus("Could not copy. Please select the address.");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }
  return (
    <div className="page-width interior contact-page">
      <header className="page-heading">
        <span className="eyebrow">03 / Contact</span>
        <h1>
          Good things start
          <br />
          <em>with a conversation.</em>
        </h1>
        <p>
          Have a project, an opportunity, or a question? I’d love to hear from
          you.
        </p>
      </header>
      <section className="contact-email">
        <span className="eyebrow">Write to me</span>
        <a href={`mailto:${email}`}>
          {email}
          <ArrowUpRight />
        </a>
        <button className="text-link" onClick={copy}>
          {status === "Copied" ? <Check size={16} /> : <Copy size={16} />}Copy
          email address
        </button>
        <p className="copy-status" role="status">
          {status}
        </p>
      </section>
      <div className="contact-social">
        <a href="https://github.com/Nuryanfa" target="_blank" rel="noreferrer">
          <span>
            <small>01 / Code & projects</small>GitHub
          </span>
          <ArrowUpRight />
        </a>
        <a
          href="https://www.linkedin.com/in/muhamad-nur-yanfa-069036368"
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <small>02 / Professional connections</small>LinkedIn
          </span>
          <ArrowUpRight />
        </a>
      </div>
      <p className="contact-location">
        Based in Bandung, Indonesia. Open to conversations across time zones.
      </p>
    </div>
  );
}
