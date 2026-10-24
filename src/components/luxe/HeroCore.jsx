import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { isEmergency } from "../../luxe/emergency";

/*
 * Agent tape: a cel-shaded VHS cassette floating on the hero's CRT.
 * Toon shading uses a three-step gradient; the ink outline is an inverted hull
 * (a slightly larger back-face shell). Reels idle-spin; a click "plays" the
 * tape (reels race, the cassette flips once). The red-alert drill tints it.
 */

const INK = "#0b0b0e";
const pointer = { x: 0, y: 0 };

// Three hard bands of light: the anime cel look.
function toonGradient() {
  const data = new Uint8Array([70, 150, 255]);
  const texture = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

// Rounded slab, centred on the origin.
function roundedSlab(width, height, depth, radius) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 2,
    curveSegments: 6,
  });
  geometry.center();
  return geometry;
}

// The sticker label, drawn on a canvas so it uses the site's fonts.
function drawLabel(canvas, alert) {
  const ctx = canvas.getContext("2d");
  const { width: w, height: h } = canvas;
  ctx.fillStyle = alert ? "#ff3b4e" : "#ff6b1a";
  ctx.fillRect(0, 0, w, h);
  // Hazard stripe along the bottom edge.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, h - 46, w, 46);
  ctx.clip();
  ctx.fillStyle = INK;
  for (let x = -60; x < w + 60; x += 44) {
    ctx.beginPath();
    ctx.moveTo(x, h);
    ctx.lineTo(x + 22, h);
    ctx.lineTo(x + 44, h - 46);
    ctx.lineTo(x + 22, h - 46);
    ctx.fill();
  }
  ctx.restore();
  ctx.fillStyle = INK;
  ctx.font = 'italic 800 150px "Barlow Condensed", "Arial Narrow", sans-serif';
  ctx.textBaseline = "alphabetic";
  ctx.fillText("NY-07", 36, 168);
  ctx.font = '800 50px "Barlow Condensed", "Arial Narrow", sans-serif';
  ctx.fillText("BACKEND · SECURITY · DEVOPS", 40, 252);
  // Yellow REC sticker in the corner.
  ctx.save();
  ctx.translate(w - 190, 70);
  ctx.rotate(-0.07);
  ctx.fillStyle = "#ffd23f";
  ctx.fillRect(-10, -44, 170, 74);
  ctx.fillStyle = INK;
  ctx.font = '800 46px "Barlow Condensed", "Arial Narrow", sans-serif';
  ctx.fillText("▶ REC", 8, 14);
  ctx.restore();
}

// Inverted hull: light, like the 2px ink outlines on the rest of the UI.
function Outline({ geometry, scale = 1.035, color = "#f4f4f0" }) {
  return (
    <mesh geometry={geometry} scale={scale}>
      <meshBasicMaterial color={color} side={THREE.BackSide} />
    </mesh>
  );
}

function Reel({ x, speed }) {
  const ref = useRef(null);
  const hub = useMemo(() => new THREE.CylinderGeometry(0.34, 0.34, 0.12, 24), []);
  const spoke = useMemo(() => new THREE.BoxGeometry(0.52, 0.08, 0.14), []);
  const tape = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.08, 32), []);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= speed.current * Math.min(delta, 1 / 30);
  });
  return (
    <group position={[x, -0.32, 0.3]}>
      <mesh geometry={tape} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#2a160b" />
      </mesh>
      <group ref={ref}>
        <mesh geometry={hub} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.03]}>
          <meshBasicMaterial color="#f4f4f0" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} geometry={spoke} rotation={[0, 0, (i * Math.PI) / 3]} position={[0, 0, 0.1]}>
            <meshBasicMaterial color={INK} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Tape({ reduced, compact }) {
  const float = useRef(null);
  const spin = useRef(null);
  const clock = useRef(0);
  const flip = useRef(0);
  const speed = useRef(1.6);
  const wasAlert = useRef(false);

  const gradient = useMemo(() => toonGradient(), []);
  const body = useMemo(() => roundedSlab(4.2, 2.6, 0.5, 0.2), []);
  const windowGeo = useMemo(() => roundedSlab(2.3, 0.78, 0.04, 0.12), []);
  const ridge = useMemo(() => new THREE.BoxGeometry(3.2, 0.16, 0.1), []);
  const screw = useMemo(() => new THREE.CylinderGeometry(0.07, 0.07, 0.04, 12), []);
  const labelCanvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 330;
    drawLabel(canvas, false);
    return canvas;
  }, []);
  const labelTexture = useMemo(() => {
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [labelCanvas]);
  const dustGeometry = useMemo(() => {
    const count = compact ? 120 : 240;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2 - 1;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [compact]);

  // Redraw once the page fonts are ready so the label uses Barlow Condensed.
  useEffect(() => {
    let alive = true;
    document.fonts?.ready.then(() => {
      if (!alive) return;
      drawLabel(labelCanvas, false);
      labelTexture.needsUpdate = true;
    });
    return () => {
      alive = false;
    };
  }, [labelCanvas, labelTexture]);

  // A click plays the tape: reels race and the cassette flips once.
  useEffect(() => {
    if (reduced) return undefined;
    const play = (event) => {
      if (event.button !== 0) return;
      speed.current = 14;
      flip.current = Math.PI * 2;
    };
    window.addEventListener("pointerdown", play);
    return () => window.removeEventListener("pointerdown", play);
  }, [reduced]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    if (!reduced) clock.current += dt;
    const t = clock.current;
    const alert = isEmergency();
    if (alert !== wasAlert.current) {
      wasAlert.current = alert;
      drawLabel(labelCanvas, alert);
      labelTexture.needsUpdate = true;
    }
    const idle = alert ? 9 : 1.6;
    speed.current += (idle - speed.current) * dt * 1.5;

    if (float.current) {
      float.current.position.y = Math.sin(t * 1.1) * 0.12;
      float.current.rotation.x += (-pointer.y * 0.22 + 0.12 - float.current.rotation.x) * 0.06;
      float.current.rotation.y += (pointer.x * 0.45 + Math.sin(t * 0.5) * 0.28 - float.current.rotation.y) * 0.05;
      float.current.rotation.z = Math.sin(t * 0.7) * 0.05 - 0.06;
    }
    if (spin.current) {
      // Ease the flip out: fast start, soft landing.
      const remaining = flip.current;
      const step = remaining * Math.min(1, dt * 4);
      flip.current -= step;
      spin.current.rotation.y += step;
      if (flip.current < 0.001) {
        spin.current.rotation.y %= Math.PI * 2;
        flip.current = 0;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <group ref={float} scale={compact ? 0.92 : 1}>
        <group ref={spin}>
          {/* Shell */}
          <Outline geometry={body} />
          <mesh geometry={body}>
            <meshToonMaterial color="#34343f" gradientMap={gradient} />
          </mesh>
          {/* Top ridge */}
          <mesh geometry={ridge} position={[0, 1.18, 0.3]}>
            <meshToonMaterial color="#33333d" gradientMap={gradient} />
          </mesh>
          {/* Sticker label */}
          <mesh position={[0, 0.58, 0.3]}>
            <planeGeometry args={[3.6, 1.16]} />
            <meshBasicMaterial map={labelTexture} toneMapped={false} />
          </mesh>
          {/* Side B: the same sticker, readable when the tape flips. */}
          <mesh position={[0, 0.58, -0.3]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[3.6, 1.16]} />
            <meshBasicMaterial map={labelTexture} toneMapped={false} />
          </mesh>
          {/* Tape window with two reels */}
          <mesh geometry={windowGeo} position={[0, -0.32, 0.27]}>
            <meshBasicMaterial color="#08080a" />
          </mesh>
          <Reel x={-0.62} speed={speed} />
          <Reel x={0.62} speed={speed} />
          <mesh position={[0, -0.32, 0.3]}>
            <boxGeometry args={[1.0, 0.07, 0.02]} />
            <meshBasicMaterial color="#2a160b" />
          </mesh>
          {/* Corner screws */}
          {[
            [-1.85, 1.05],
            [1.85, 1.05],
            [-1.85, -1.05],
            [1.85, -1.05],
          ].map(([x, y]) => (
            <mesh key={`${x}${y}`} geometry={screw} rotation={[Math.PI / 2, 0, 0]} position={[x, y, 0.3]}>
              <meshBasicMaterial color="#8c8c97" />
            </mesh>
          ))}
        </group>
      </group>
      <points geometry={dustGeometry}>
        <pointsMaterial
          color="#ffd23f"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </points>
    </>
  );
}

export default function HeroCore({ reduced = false }) {
  const wrap = useRef(null);
  const [active, setActive] = useState(true);
  const [compact] = useState(() => window.matchMedia("(max-width: 767px)").matches);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), {
      rootMargin: "80px",
    });
    observer.observe(wrap.current);
    const move = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <div ref={wrap} className="lx-core" aria-hidden="true">
      <Canvas
        dpr={[1, compact ? 1.5 : 1.75]}
        // Far enough that the floating, flipping tape never touches the frame edge.
        camera={{ position: [0, 0, 7.6], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active && !reduced ? "always" : "demand"}
      >
        <Tape reduced={reduced} compact={compact} />
      </Canvas>
    </div>
  );
}
