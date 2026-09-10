"use client";

import { useTexture } from "@react-three/drei/core/Texture";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MathUtils, Mesh, SRGBColorSpace } from "three";
import { mountainTexture, windowDepthConfig } from "./roomSceneConfig";
import { RoomBox } from "./RoomArchitecture";

export function WindowView({ motionEnabled }: { motionEnabled: boolean }) {
  const landscape = useRef<Mesh>(null);
  const desired = useRef({ x: 0, y: 0 });
  const { gl, invalidate } = useThree();
  // A small fixed margin keeps pointer motion from exposing the image edges.
  const width = 2.7 + 2 * windowDepthConfig.parallaxX;
  const height = 1.8 + 2 * windowDepthConfig.parallaxY;
  const source = useTexture(mountainTexture);
  const texture = useMemo(() => {
    const copy = source.clone();
    copy.colorSpace = SRGBColorSpace;
    const image = source.image as HTMLImageElement;
    const aspect = image.width / image.height;
    const target = width / height;
    if (aspect > target) { copy.repeat.x = target / aspect; copy.offset.x = (1 - copy.repeat.x) / 2; }
    else { copy.repeat.y = aspect / target; copy.offset.y = (1 - copy.repeat.y) / 2; }
    copy.needsUpdate = true;
    return copy;
  }, [source, width, height]);
  useEffect(() => () => texture.dispose(), [texture]);

  useEffect(() => {
    const canvas = gl.domElement;
    const reset = () => {
      desired.current.x = 0;
      desired.current.y = 0;
      invalidate();
    };
    reset();
    if (!motionEnabled) {
      if (landscape.current) {
        landscape.current.position.x = 0;
        landscape.current.position.y = 0;
      }
      return;
    }
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.buttons) return;
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
      const y = MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height * 2, -1, 1);
      desired.current.x = -x * windowDepthConfig.parallaxX;
      desired.current.y = -y * windowDepthConfig.parallaxY;
      invalidate();
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", reset);
    canvas.addEventListener("pointerdown", reset);
    canvas.addEventListener("pointercancel", reset);
    canvas.addEventListener("wheel", reset, { passive: true });
    return () => {
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", reset);
      canvas.removeEventListener("pointerdown", reset);
      canvas.removeEventListener("pointercancel", reset);
      canvas.removeEventListener("wheel", reset);
    };
  }, [gl, invalidate, motionEnabled]);

  useFrame((_, delta) => {
    if (!motionEnabled || !landscape.current) return;
    const position = landscape.current.position;
    const step = Math.min(delta, 0.05);
    position.x = MathUtils.damp(position.x, desired.current.x, windowDepthConfig.damping, step);
    position.y = MathUtils.damp(position.y, desired.current.y, windowDepthConfig.damping, step);
    if (Math.abs(position.x - desired.current.x) + Math.abs(position.y - desired.current.y) > 0.00001) {
      invalidate();
    }
  });

  return <group>
    {/* Local negative Z places the landscape behind this right-wall window. */}
    <group position={[2.47, 1.75, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <mesh ref={landscape} position={[0, 0, -windowDepthConfig.depth]}>
        <planeGeometry args={[width, height]} /><meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
    <mesh position={[2.47, 1.75, 0]} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={[2.7, 1.8]} /><meshStandardMaterial color="#a5b9c0" transparent opacity={0.06} roughness={0.2} depthWrite={false} />
    </mesh>
    {[0.85, 2.65].map(y => <RoomBox key={y} position={[2.45, y, 0]} size={[0.22, 0.085, 2.84]} color="#111315" />)}
    {[-1.35, 0, 1.35].map(z => <RoomBox key={z} position={[2.45, 1.75, z]} size={[0.18, 1.85, 0.065]} color="#111315" />)}
  </group>;
}
