import { RoomBox } from "./RoomArchitecture";
import { roomPropConfig } from "./roomSceneConfig";

export function DeskAccessories() {
  const { keyboard, mouse } = roomPropConfig;
  return <group>
    <group position={keyboard.position} rotation={keyboard.rotation} scale={keyboard.scale}>
      <RoomBox position={[0, 0, 0]} size={keyboard.size} color={keyboard.color} />
    </group>
    <mesh position={mouse.position} rotation={mouse.rotation} scale={mouse.scale}>
      <sphereGeometry args={[1, 16, 8]} />
      <meshStandardMaterial color={mouse.color} />
    </mesh>
  </group>;
}
