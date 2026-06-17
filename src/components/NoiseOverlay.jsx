export default function NoiseOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.05] mix-blend-difference">
      <svg className="absolute inset-0 w-full h-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"></rect>
      </svg>
    </div>
  );
}
