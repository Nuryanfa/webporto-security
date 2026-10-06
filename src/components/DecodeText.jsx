// Keep important text readable immediately; motion is reserved for panel transitions.
export default function DecodeText({ text, className = "" }) {
  return <span className={className}>{text}</span>;
}
