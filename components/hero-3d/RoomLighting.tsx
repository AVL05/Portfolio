import { roomLightingConfig as lighting } from "./roomSceneConfig";

export function RoomLighting({ compact }: { compact: boolean }) {
  return <group>
    <ambientLight intensity={lighting.ambient} />
    <hemisphereLight args={[lighting.hemisphere.sky, lighting.hemisphere.ground, lighting.hemisphere.intensity]} />
    <directionalLight {...lighting.sunset} castShadow={!compact}
      shadow-mapSize={[1024, 1024]} shadow-normalBias={0.025}
      shadow-camera-near={0.5} shadow-camera-far={16}
      shadow-camera-left={-3.8} shadow-camera-right={3.8}
      shadow-camera-top={3.8} shadow-camera-bottom={-3.8} />
    <directionalLight {...lighting.fill} />
  </group>;
}
