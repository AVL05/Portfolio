"use client";

import { useGLTF } from "@react-three/drei/core/Gltf";
import { useTexture } from "@react-three/drei/core/Texture";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { ACESFilmicToneMapping, Group, MathUtils, PCFSoftShadowMap, SRGBColorSpace } from "three";
import { RoomArchitecture } from "./RoomArchitecture";
import { WindowView } from "./WindowView";
import { DeskModel } from "./models/DeskModel";
import { MonitorModel } from "./models/MonitorModel";
import { PcModel } from "./models/PcModel";
import { ChairModel } from "./models/ChairModel";
import { CameraModel } from "./models/CameraModel";
import { CameraLensModel } from "./models/CameraLensModel";
import { ShelfModel } from "./models/ShelfModel";
import { PlantModel } from "./models/PlantModel";
import { DeskLampModel } from "./models/DeskLampModel";
import { RugModel } from "./models/RugModel";
import { WallPanelModel } from "./models/WallPanelModel";
import { DeskAccessories } from "./DeskAccessories";
import { RoomLighting } from "./RoomLighting";
import { RoomControls } from "./RoomControls";
import { RoomHotspots } from "./RoomHotspots";
import { mountainTexture, roomCameraConfig, roomLightingConfig, roomSceneConfig, roomInteractionConfig, type RoomHotspotId } from "./roomSceneConfig";


function Unavailable({ onUnavailable }: { onUnavailable: () => void }) {
  useEffect(onUnavailable, [onUnavailable]);
  return null;
}

// Reveal after all models resolve and the renderer has drawn a complete frame.
function ReadyFrame({ compact, onReady }: { compact: boolean; onReady: () => void }) {
  useGLTF(Object.entries(roomSceneConfig)
    .filter(([key]) => !compact || !["cameraLens", "shelf"].includes(key))
    .map(([, model]) => "/hero-3d/optimized/" + model.file + ".glb"), false, true);
  useTexture(mountainTexture);
  const frames = useRef(0);
  const invalidate = useThree(state => state.invalidate);
  useFrame(() => {
    if (frames.current === 2) return;
    frames.current += 1;
    if (frames.current === 2) onReady();
    else invalidate();
  });
  return null;
}

function ContextHealth() {
  const { gl } = useThree();
  const [lost, setLost] = useState(false);
  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = () => setLost(true);
    canvas.addEventListener("webglcontextlost", onLost);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl]);
  if (lost) throw new Error("Creative room WebGL context lost");
  return null;
}

function Room({ reducedMotion, compact, language, onNavigate, activeHotspot }: SceneProps) {
  const group = useRef<Group>(null);
  const desired = useRef(0);
  const { gl, invalidate } = useThree();
  useEffect(() => {
    if (reducedMotion || compact) {
      desired.current = 0;
      if (group.current) group.current.rotation.y = 0;
      invalidate();
      return;
    }
    const element = gl.domElement;
    const move = (event: PointerEvent) => {
      if (reducedMotion || compact || event.buttons || event.pointerType !== "mouse") return;
      const rect = element.getBoundingClientRect();
      desired.current = ((event.clientX - rect.left) / rect.width - 0.5) * 2 * roomInteractionConfig.roomParallax;
      invalidate();
    };
    const reset = () => { desired.current = 0; invalidate(); };
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointerdown", reset);
    return () => {
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointerdown", reset);
    };
  }, [gl, invalidate, reducedMotion, compact]);
  useFrame((_, delta) => {
    if (!group.current) return;
    const target = reducedMotion || compact ? 0 : desired.current;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, target, roomInteractionConfig.roomDamping, Math.min(delta, 0.05));
    if (Math.abs(group.current.rotation.y - target) > 0.00001) invalidate();
  });
  return <group ref={group}>
    <RoomLighting compact={compact} />
    <RoomArchitecture />
    <DeskAccessories />
    <Suspense fallback={null}><WindowView motionEnabled={!reducedMotion && !compact} /></Suspense>
    <Suspense fallback={null}><DeskModel /><MonitorModel /><PcModel /></Suspense>
    <Suspense fallback={null}><RugModel /><ChairModel /></Suspense>
    <Suspense fallback={null}><DeskLampModel reducedMotion={reducedMotion} /></Suspense>
    <Suspense fallback={null}><WallPanelModel /></Suspense>
    <Suspense fallback={null}><PlantModel /></Suspense>
    <Suspense fallback={null}><CameraModel /></Suspense>
    {!compact && <Suspense fallback={null}><CameraLensModel /><ShelfModel /></Suspense>}
    <RoomHotspots language={language} onNavigate={onNavigate} activeHotspot={activeHotspot} />
  </group>;
}

type SceneProps = { onReady: () => void; onUnavailable: () => void; expanded: boolean; reset: number; compact: boolean; reducedMotion: boolean; language: "es" | "en"; onNavigate: (href: string) => void; activeHotspot: RoomHotspotId };
export default function CreativeRoomScene(props: SceneProps) {

  useEffect(() => {
    const entries = Object.entries(roomSceneConfig);
    for (const [key, placement] of entries) {
      if (props.compact && ["cameraLens", "shelf"].includes(key)) continue;
      useGLTF.preload(`/hero-3d/optimized/${placement.file}.glb`, false, true);
    }
  }, [props.compact]);
  return <><Canvas dpr={props.compact ? 1 : [1, 1.5]} frameloop="demand" shadows={!props.compact}
    fallback={<Unavailable onUnavailable={props.onUnavailable} />}
    camera={{ position: roomCameraConfig.position, fov: roomCameraConfig.fov, near: 0.1, far: 60 }}
    gl={{ antialias: !props.compact, alpha: true, powerPreference: "low-power" }}
    onCreated={({ gl }) => {
      gl.toneMapping = ACESFilmicToneMapping;
      gl.toneMappingExposure = roomLightingConfig.exposure;
      gl.outputColorSpace = SRGBColorSpace;
      gl.shadowMap.type = PCFSoftShadowMap;
    }}>
    <Room {...props} />
    <Suspense fallback={null}><ReadyFrame compact={props.compact} onReady={props.onReady} /></Suspense>
    <ContextHealth />
    <RoomControls {...props} />
  </Canvas></>;
}
