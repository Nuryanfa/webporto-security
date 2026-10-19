import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${noise}
void main(){
  vec3 p = position;
  float n = snoise(p * 0.95 + vec3(uTime * 0.16));
  float detail = snoise(p * 2.6 - vec3(uTime * 0.22)) * 0.28;
  vNoise = n + detail;
  vec3 displaced = p + normal * vNoise * uAmp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vView = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}`;

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
void main(){
  float facing = max(dot(normalize(vNormal), normalize(vView)), 0.0);
  float fresnel = pow(1.0 - facing, 2.4);
  float band = 0.5 + 0.5 * sin(vNoise * 5.0 + uTime * 0.5);
  vec3 tint = mix(uA, uB, band);
  tint = mix(tint, uC, smoothstep(0.35, 1.0, vNoise) * 0.55);
  vec3 color = vec3(0.012, 0.016, 0.024) + tint * (0.05 + fresnel * 1.1);
  float contour = smoothstep(0.92, 1.0, fract(vNoise * 6.0 + uTime * 0.04));
  color += tint * contour * (0.14 + fresnel * 0.3);
  gl_FragColor = vec4(color, 1.0);
}`;

const pointer = { x: 0, y: 0 };

function Core({ detail, reduced }) {
  const group = useRef(null);
  const shell = useRef(null);
  const ring = useRef(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 4.2 },
      uAmp: { value: 0.26 },
      uA: { value: new THREE.Color("#6ff0e4") },
      uB: { value: new THREE.Color("#8f7cff") },
      uC: { value: new THREE.Color("#ff7a5c") },
    }),
    [],
  );

  const ringGeometry = useMemo(() => {
    const count = detail > 64 ? 1400 : 700;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.15 + (Math.random() - 0.5) * 0.5 + Math.random() ** 6 * 0.9;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [detail]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30);
    if (!reduced) uniforms.uTime.value += dt;
    const g = group.current;
    if (!g) return;
    g.rotation.y += (pointer.x * 0.45 - g.rotation.y) * 0.04;
    g.rotation.x += (-pointer.y * 0.3 - g.rotation.x) * 0.04;
    if (shell.current) shell.current.rotation.y -= dt * 0.06;
    if (ring.current) ring.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.32, detail]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>
      <mesh ref={shell} scale={1.58}>
        <icosahedronGeometry args={[1, 2]} />
        <meshBasicMaterial color="#6ff0e4" wireframe transparent opacity={0.06} />
      </mesh>
      <group rotation={[0.42, 0, -0.18]}>
        <points ref={ring} geometry={ringGeometry}>
          <pointsMaterial
            color="#a9fff6"
            size={0.012}
            sizeAttenuation
            transparent
            opacity={0.7}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}

export default function HeroOrb({ reduced = false }) {
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
    <div ref={wrap} className="lx-orb" aria-hidden="true">
      <Canvas
        dpr={[1, compact ? 1.5 : 1.75]}
        camera={{ position: [0, 0, 6.2], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active && !reduced ? "always" : "demand"}
      >
        <Core detail={compact ? 40 : 96} reduced={reduced} />
      </Canvas>
    </div>
  );
}
