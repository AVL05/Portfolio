"use client";

import { useTexture } from "@react-three/drei/core/Texture";
import { Component, Suspense, useEffect, useMemo, type ReactNode } from "react";
import { SRGBColorSpace } from "three";
import { monitorScreenConfig as screen, roomSceneConfig } from "./roomSceneConfig";

function DarkScreen() {
  return <meshStandardMaterial color={screen.color} emissive={screen.color}
    emissiveIntensity={screen.emissiveIntensity} roughness={0.55} />;
}

class ScreenBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <DarkScreen /> : this.props.children; }
}

function ScreenTexture({ url }: { url: string }) {
  const source = useTexture(url);
  const texture = useMemo(() => {
    const copy = source.clone();
    const image = source.image as HTMLImageElement;
    const aspect = image.width / image.height;
    copy.colorSpace = SRGBColorSpace;
    if (aspect > screen.aspect) {
      copy.repeat.x = screen.aspect / aspect;
      copy.offset.x = (1 - copy.repeat.x) / 2;
    } else {
      copy.repeat.y = aspect / screen.aspect;
      copy.offset.y = (1 - copy.repeat.y) / 2;
    }
    copy.needsUpdate = true;
    return copy;
  }, [source]);
  useEffect(() => () => texture.dispose(), [texture]);
  return <meshStandardMaterial map={texture} color="#b4b4b4" emissiveMap={texture}
    emissive="#ffffff" emissiveIntensity={screen.emissiveIntensity} roughness={0.55} />;
}

export function MonitorScreen() {
  const monitor = roomSceneConfig.monitor;
  return <group position={monitor.position} rotation={monitor.rotation} scale={monitor.size * monitor.scale}>
    <group position={screen.position} rotation={screen.rotation} scale={screen.scale}>
      <mesh position={[0, 0, screen.offset]}>
        <planeGeometry args={[screen.width, screen.width / screen.aspect]} />
        <ScreenBoundary key={screen.texture}>
          <Suspense fallback={<DarkScreen />}>
            {screen.texture ? <ScreenTexture url={screen.texture} /> : <DarkScreen />}
          </Suspense>
        </ScreenBoundary>
      </mesh>
    </group>
  </group>;
}
