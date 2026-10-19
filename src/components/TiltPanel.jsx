/** Pointer physics are delegated by useHoloTilt in Layout. */
export default function TiltPanel({ children, className = "" }) {
  return <div className={`holo-tilt tactical-spotlight-card ${className}`}>{children}</div>;
}
