import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/*
 * Defense core: a faceted octahedron inside a hexagonal barrier.
 * The barrier is invisible until something hits it; each impact sends an
 * expanding ring across the hex lattice (a firewall absorbing an attack).
 */

const IMPACTS = 4;

const coreVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vPos;
void main(){
  vPos = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`;

const coreFragment = /* glsl */ `
uniform float uTime;
uniform float uAlert;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vPos;
void main(){
  float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
  float fresnel = pow(1.0 - facing, 2.0);
  vec3 orange = vec3(1.0, 0.45, 0.0);
  vec3 red = vec3(1.0, 0.1, 0.2);
  vec3 tint = mix(orange, red, uAlert);
  // A scan band climbs the crystal; facets catch light by their normal.
  float scan = smoothstep(0.06, 0.0, abs(fract(vPos.y * 0.42 - uTime * 0.22) - 0.5));
  float facet = 0.5 + 0.5 * dot(normalize(vNormal), normalize(vec3(0.4, 0.9, 0.6)));
  vec3 color = vec3(0.02, 0.016, 0.02) + vec3(0.05, 0.05, 0.07) * facet;
  color += tint * (fresnel * 0.9 + scan * 0.55);
  gl_FragColor = vec4(color, 1.0);
}`;

const shieldVertex = /* glsl */ `
varying vec3 vDir;
varying vec3 vNormal;
varying vec3 vView;
void main(){
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`;

const shieldFragment = /* glsl */ `
uniform float uTime;
uniform vec4 uImpacts[${IMPACTS}];
varying vec3 vDir;
varying vec3 vNormal;
varying vec3 vView;

float hexEdge(vec2 p){
  // Distance to the nearest hexagon edge in a pointy-top lattice.
  vec2 r = vec2(1.0, 1.7320508);
  vec2 h = r * 0.5;
  vec2 a = mod(p, r) - h;
  vec2 b = mod(p - h, r) - h;
  vec2 g = dot(a, a) < dot(b, b) ? a : b;
  vec2 q = abs(g);
  return 0.5 - max(dot(q, normalize(r)), q.x);
}

void main(){
  vec2 uv = vec2(atan(vDir.z, vDir.x) / 6.2831853, asin(clamp(vDir.y, -1.0, 1.0)) / 3.1415926);
  float lattice = 1.0 - smoothstep(0.0, 0.06, hexEdge(uv * vec2(34.0, 17.0)));
  float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.0);

  float energy = 0.0;
  for (int i = 0; i < ${IMPACTS}; i++) {
    vec4 hit = uImpacts[i];
    float age = uTime - hit.w;
    if (age < 0.0 || age > 2.2) continue;
    float d = acos(clamp(dot(vDir, normalize(hit.xyz)), -1.0, 1.0));
    float front = age * 1.25;
    float ring = smoothstep(0.22, 0.0, abs(d - front)) * (1.0 - age / 2.2);
    float flash = smoothstep(0.5, 0.0, d) * max(0.0, 1.0 - age * 2.5);
    energy += ring + flash;
  }

  vec3 orange = vec3(1.0, 0.48, 0.0);
  float alpha = lattice * (energy * 0.9 + rim * 0.12) + energy * 0.12 + rim * 0.05;
  gl_FragColor = vec4(orange * (0.6 + energy), alpha);
}`;

const pointer = { x: 0, y: 0 };

function Defense({ reduced, compact }) {
  const group = useRef(null);
  const inner = useRef(null);
  const dust = useRef(null);
  const nextHit = useRef(0);
  const slot = useRef(0);

  const coreUniforms = useMemo(() => ({ uTime: { value: 0 }, uAlert: { value: 0 } }), []);
  const shieldUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uImpacts: { value: Array.from({ length: IMPACTS }, () => new THREE.Vector4(0, 0, 1, -10)) },
    }),
    [],
  );

  const octa = useMemo(() => new THREE.OctahedronGeometry(1.15, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(octa), [octa]);
  const dustGeometry = useMemo(() => {
    const count = compact ? 260 : 520;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [compact]);

  // Register an impact at a direction on the barrier.
  const hit = (direction, time) => {
    const target = shieldUniforms.uImpacts.value[slot.current % IMPACTS];
    target.set(direction.x, direction.y, direction.z, time);
    slot.current += 1;
    coreUniforms.uAlert.value = 1;
  };

  useEffect(() => {
    const strike = (event) => {
      if (event.button !== 0) return;
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -((event.clientY / window.innerHeight) * 2 - 1);
      const dir = new THREE.Vector3(x * 1.4, y * 1.4, 1).normalize();
      hit(dir, shieldUniforms.uTime.value);
    };
    window.addEventListener("pointerdown", strike);
    return () => window.removeEventListener("pointerdown", strike);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 1 / 30);
    if (!reduced) {
      coreUniforms.uTime.value += dt;
      shieldUniforms.uTime.value += dt;
    }
    const t = shieldUniforms.uTime.value;
    coreUniforms.uAlert.value = Math.max(0, coreUniforms.uAlert.value - dt * 1.6);

    // Ambient probes: something keeps testing the perimeter.
    if (!reduced && t > nextHit.current) {
      nextHit.current = t + 1.1 + Math.random() * 1.6;
      const a = Math.random() * Math.PI * 2;
      hit(new THREE.Vector3(Math.cos(a), (Math.random() - 0.5) * 1.2, Math.abs(Math.sin(a)) + 0.4).normalize(), t);
    }

    const g = group.current;
    if (g) {
      g.rotation.y += (pointer.x * 0.35 - g.rotation.y) * 0.05;
      g.rotation.x += (-pointer.y * 0.25 - g.rotation.x) * 0.05;
    }
    if (inner.current) {
      inner.current.rotation.y = t * 0.35;
      inner.current.rotation.z = Math.sin(t * 0.4) * 0.2;
    }
    if (dust.current) dust.current.rotation.y = t * 0.02;
  });

  return (
    <>
      <group ref={group}>
        <group ref={inner}>
          <mesh geometry={octa}>
            <shaderMaterial vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={coreUniforms} />
          </mesh>
          <lineSegments geometry={edges}>
            <lineBasicMaterial color="#ff8a1f" transparent opacity={0.9} />
          </lineSegments>
          <lineSegments geometry={edges} scale={0.55} rotation={[0, Math.PI / 4, 0]}>
            <lineBasicMaterial color="#ff2d4a" transparent opacity={0.55} />
          </lineSegments>
        </group>
        <mesh>
          <icosahedronGeometry args={[2.05, compact ? 24 : 48]} />
          <shaderMaterial
            vertexShader={shieldVertex}
            fragmentShader={shieldFragment}
            uniforms={shieldUniforms}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      <points ref={dust} geometry={dustGeometry}>
        <pointsMaterial
          color="#ff9a3c"
          size={0.014}
          sizeAttenuation
          transparent
          opacity={0.55}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
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
        camera={{ position: [0, 0, 6.4], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active && !reduced ? "always" : "demand"}
      >
        <Defense reduced={reduced} compact={compact} />
      </Canvas>
    </div>
  );
}
