export default function ScanlineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Static CRT Scanlines */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay scanlines"></div>
      
      {/* Moving Radar Sweep Line */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-cyber-cyan/10 to-transparent opacity-30 radar-sweep"></div>
      
      {/* Occasional Global Glitch Overlay */}
      <div className="absolute inset-0 mix-blend-overlay opacity-0 animate-global-glitch bg-white/5"></div>
    </div>
  );
}
