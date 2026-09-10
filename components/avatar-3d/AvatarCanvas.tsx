"use client";

import { Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Component, Suspense, useEffect, useState, type ReactNode } from "react";
import AvatarModel from "./AvatarModel";

class AvatarErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed
      ? <p role="alert">No se pudo cargar el avatar. Recarga la página para reintentar.</p>
      : this.props.children;
  }
}

function ResetPointer() {
  const { gl, pointer } = useThree();
  useEffect(() => {
    const reset = () => pointer.set(0, 0);
    gl.domElement.addEventListener("pointerleave", reset);
    gl.domElement.addEventListener("pointercancel", reset);
    return () => {
      gl.domElement.removeEventListener("pointerleave", reset);
      gl.domElement.removeEventListener("pointercancel", reset);
    };
  }, [gl, pointer]);
  return null;
}

export default function AvatarCanvas() {
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className="h-[75svh] min-h-80 w-full overflow-hidden rounded-lg bg-[#d4d4d4] text-neutral-900" aria-label="Vista 3D del avatar">
      <AvatarErrorBoundary>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 3], fov: 35, near: 0.01, far: 20 }}
          frameloop={reducedMotion ? "demand" : "always"}
          gl={{ antialias: true, alpha: false }}
          fallback={<p role="alert">WebGL no está disponible en este navegador.</p>}
        >
          <color attach="background" args={["#d4d4d4"]} />
          <hemisphereLight args={["#ffffff", "#b1b1b1", 1.5]} />
          <directionalLight position={[2, 3, 4]} intensity={2} />
          <ResetPointer />
          <Suspense fallback={<Html center><p role="status" className="whitespace-nowrap">Cargando avatar…</p></Html>}>
            <AvatarModel reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </AvatarErrorBoundary>
    </div>
  );
}
