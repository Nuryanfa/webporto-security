import DecodeText from "./DecodeText";

/** Backwards-compatible alias; one shared decoding implementation. */
export default function DecryptText({ text, speed = 40, className = "", chars }) {
  return <DecodeText text={text} speed={speed} className={className} chars={chars} />;
}
