"use client";

import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import { Vector3 } from "three";
import { getRoomCameraPosition } from "./roomCamera";
import { roomCameraConfig as cameraConfig, roomInteractionConfig as motion } from "./roomSceneConfig";

export function RoomControls({ expanded, reset, reducedMotion }: { expanded: boolean; reset: number; reducedMotion: boolean }) {
  const control = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera, gl, invalidate, size } = useThree();
  const goal = useMemo(() => getRoomCameraPosition(size.width / Math.max(size.height, 1)), [size.width, size.height]);
  const transition = useRef({ active: false, initialized: false, elapsed: 0, from: new Vector3() });
  const limits = useMemo(() => {
    const distance = goal.distanceTo(new Vector3(...cameraConfig.target));
    return { min: expanded ? cameraConfig.focusMinDistance : distance * motion.heroMinDistanceFactor,
      max: Math.max(motion.maxDistance, distance * motion.maxDistanceFactor) };
  }, [goal, expanded]);

  useEffect(() => {
    const orbit = control.current;
    if (!orbit) return;
    const stop = () => {
      transition.current.active = false;
      orbit.enabled = true;
      orbit.enableDamping = !reducedMotion;
      orbit.minDistance = limits.min;
      orbit.maxDistance = limits.max;
      invalidate();
    };
    gl.domElement.addEventListener("pointerdown", stop, true);
    return () => gl.domElement.removeEventListener("pointerdown", stop, true);
  }, [gl, invalidate, limits, reducedMotion]);

  useEffect(() => {
    const orbit = control.current;
    if (!orbit) return;
    orbit.enableDamping = false;
    orbit.update();
    orbit.target.set(...cameraConfig.target);
    const state = transition.current;
    state.from.copy(camera.position);
    state.elapsed = 0;
    state.active = state.initialized && !reducedMotion;
    state.initialized = true;
    orbit.enabled = !state.active;
    orbit.minDistance = state.active ? cameraConfig.focusMinDistance : limits.min;
    orbit.maxDistance = Math.max(limits.max, camera.position.distanceTo(orbit.target));
    if (!state.active) {
      camera.position.copy(goal);
      camera.lookAt(orbit.target);
      orbit.update();
      orbit.enableDamping = !reducedMotion;
    }
    invalidate();
  }, [camera, goal, reset, expanded, reducedMotion, limits, invalidate]);

  useFrame((_, delta) => {
    const state = transition.current;
    const orbit = control.current;
    if (!state.active || !orbit) return;
    state.elapsed += Math.min(delta, 0.05);
    const progress = Math.min(state.elapsed / motion.cameraDuration, 1);
    camera.position.lerpVectors(state.from, goal, 1 - Math.pow(1 - progress, 3));
    camera.lookAt(orbit.target);
    orbit.update();
    if (progress === 1) {
      state.active = false;
      orbit.enabled = true;
      orbit.enableDamping = !reducedMotion;
      orbit.minDistance = limits.min;
      orbit.maxDistance = limits.max;
    } else invalidate();
  });

  return <OrbitControls ref={control} makeDefault target={cameraConfig.target} enablePan={false}
    enableDamping={!reducedMotion} dampingFactor={motion.orbitDamping} enableZoom={expanded}
    minPolarAngle={cameraConfig.minPolarAngle} maxPolarAngle={cameraConfig.maxPolarAngle}
    minAzimuthAngle={cameraConfig.minAzimuthAngle} maxAzimuthAngle={cameraConfig.maxAzimuthAngle}
    rotateSpeed={motion.rotateSpeed} zoomSpeed={motion.zoomSpeed} />;
}
