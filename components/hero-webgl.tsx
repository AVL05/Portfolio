"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Fondo WebGL del hero: un campo de partículas GPU que fluye con ruido y
 * reacciona al ratón. Colores tomados de los tokens del tema (primary/accent).
 *
 * Optimizado y respetuoso:
 *  - Respeta prefers-reduced-motion (no monta nada, deja el fondo estático).
 *  - Pausa el bucle de render cuando el hero sale del viewport (IntersectionObserver).
 *  - No se monta en móvil; el hero conserva profundidad con CSS.
 *  - Cap de DPR a 2 y de partículas según ancho para no ahogar equipos modestos.
 *  - Limpieza completa de geometría, material, renderer y listeners al desmontar.
 */

// Three.js no interpreta los espacios perceptuales modernos que puede devolver
// getComputedStyle: conserva formatos CSS clásicos y usa un sRGB explícito.
function tokenColor(name: string, fallback: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw || /^(oklch|oklab|lch|lab)\(/i.test(raw)) {
    return new THREE.Color(fallback);
  }
  return new THREE.Color(raw);
}

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute vec3  aSeed;

  varying float vGlow;

  // Ruido simplex 3D (Ashima) — compacto.
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;

    // Campo de flujo: desplaza cada partícula por ruido evolutivo.
    float t = uTime * 0.08;
    vec3 np = pos * 0.35 + aSeed;
    float n1 = snoise(np + vec3(0.0, 0.0, t));
    float n2 = snoise(np.yzx + vec3(t, 0.0, 0.0));
    vec3 flow = vec3(n1, n2, snoise(np.zxy - vec3(0.0, t, 0.0)));
    pos += flow * 2.2;

    // Respiración lenta del conjunto.
    pos *= 1.0 + 0.05 * sin(uTime * 0.3 + aSeed.x * 6.28);

    // Parallax hacia el ratón, más fuerte en las capas cercanas (z alto).
    float depth = smoothstep(-14.0, 14.0, pos.z);
    pos.xy += uMouse * mix(0.6, 3.4, depth);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Brillo por la cresta del ruido → algunas partículas destellan.
    vGlow = smoothstep(0.35, 1.0, n1 * 0.5 + 0.5) * aScale;

    gl_PointSize = uSize * aScale * uPixelRatio * (300.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  varying float vGlow;

  void main() {
    // Punto redondo con caída suave (sprite procedural, sin textura).
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);

    vec3 color = mix(uColorA, uColorB, vGlow);
    // Núcleo más brillante en las partículas con más glow.
    color += vGlow * 0.9;

    gl_FragColor = vec4(color, alpha * (0.5 + vGlow * 0.9));
  }
`;

export function HeroWebGL() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 26;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Nº de partículas según ancho: suficiente presencia sin castigar portátiles.
    const count = width < 1280 ? 4200 : 6500;

    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count * 3);

    // Distribución en un elipsoide hueco para que quede volumétrico.
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta) * 1.4;
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
      positions[i * 3 + 2] = r * Math.cos(phi);

      scales[i] = 0.4 + Math.random() * Math.random() * 2.2;
      seeds[i * 3] = Math.random() * 10;
      seeds[i * 3 + 1] = Math.random() * 10;
      seeds[i * 3 + 2] = Math.random() * 10;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uSize: { value: 7.0 },
        uPixelRatio: { value: dpr },
        uColorA: { value: tokenColor("--primary", "#e58b6f") },
        uColorB: { value: tokenColor("--accent", "#9bc982") },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Interacción ratón (suavizada) ──────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const target = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // ── Resize ─────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // ── Pausa fuera de viewport ────────────────────────────────────
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) timer.reset();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    // ── Bucle ──────────────────────────────────────────────────────
    const timer = new THREE.Timer();
    timer.connect(document);
    let raf = 0;
    const tick = (timestamp?: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;

      timer.update(timestamp);
      const t = timer.getElapsed();
      mouse.lerp(target, 0.05);
      material.uniforms.uTime.value = t;
      material.uniforms.uMouse.value.copy(mouse);

      // Rotación lenta y deriva del conjunto.
      points.rotation.y = t * 0.04;
      points.rotation.x = Math.sin(t * 0.1) * 0.12;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      timer.dispose();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-25 [mask-image:radial-gradient(ellipse_70%_55%_at_66%_42%,black,transparent_82%)]"
    />
  );
}
