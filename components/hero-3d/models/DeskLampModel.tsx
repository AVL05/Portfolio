"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Object3D, SpotLight } from "three";
import { RoomModel } from "./RoomModel";
import { lampLightConfig, roomInteractionConfig, roomSceneConfig, type ModelPlacement } from "../roomSceneConfig";

const unitLamp: ModelPlacement = {
  ...roomSceneConfig.lamp,
  position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, size: 1,
};

export function DeskLampModel({ reducedMotion }: { reducedMotion: boolean }) {
  const spot = useRef<SpotLight>(null);
  const invalidate = useThree(state => state.invalidate);
  const lamp = roomSceneConfig.lamp;
  const light = lampLightConfig;
  const target = useMemo(() => new Object3D(), []);
  useEffect(() => {
    if (spot.current) spot.current.intensity = light.intensity;
    invalidate();
  }, [reducedMotion, light.intensity, invalidate]);
  // Reuse interaction frames; this light never schedules an animation loop.
  useFrame(({ clock }) => {
    if (!reducedMotion && spot.current) {
      spot.current.intensity = light.intensity * (1 + Math.sin(clock.elapsedTime * roomInteractionConfig.lampFrequency) * roomInteractionConfig.lampVariation);
    }
  });
  return <group position={lamp.position} rotation={lamp.rotation} scale={lamp.size * lamp.scale}>
    <RoomModel placement={unitLamp} />
    <primitive object={target} position={light.target} />
    <mesh position={light.position} scale={light.emitterScale}>
      <sphereGeometry args={[1, 12, 6]} />
      <meshStandardMaterial color={light.color} emissive={light.color} emissiveIntensity={2} />
    </mesh>
    <spotLight ref={spot} position={light.position} target={target} color={light.color}
      intensity={light.intensity} angle={light.angle} distance={light.distance}
      penumbra={1} decay={2} />
  </group>;
}
