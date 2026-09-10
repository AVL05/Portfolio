import type { Vector3Tuple } from "three";

export function RoomBox({ position, size, color = "#292a2b" }: { position: Vector3Tuple; size: Vector3Tuple; color?: string }) {
  return <mesh position={position} receiveShadow castShadow><boxGeometry args={size} /><meshStandardMaterial color={color} roughness={0.85} /></mesh>;
}

export function RoomArchitecture() {
  return <group>
    <RoomBox position={[0, -0.16, 0]} size={[5.1, 0.3, 4.2]} color="#141516" />
    {Array.from({ length: 12 }, (_, i) => <RoomBox key={i} position={[-2.29 + i * 0.416, 0, 0]} size={[0.406, 0.04, 4]} color={i % 3 === 0 ? "#76523a" : "#684832"} />)}
    <RoomBox position={[0, 1.55, -2]} size={[5, 3.1, 0.14]} />
    {/* Four wall segments leave a real opening: y .85–2.65, z -1.35–1.35. */}
    <RoomBox position={[2.5, 0.425, 0]} size={[0.14, 0.85, 4]} />
    <RoomBox position={[2.5, 2.875, 0]} size={[0.14, 0.45, 4]} />
    <RoomBox position={[2.5, 1.75, -1.675]} size={[0.14, 1.8, 0.65]} />
    <RoomBox position={[2.5, 1.75, 1.675]} size={[0.14, 1.8, 0.65]} />
    <RoomBox position={[0, 3.13, -1.75]} size={[5.15, 0.13, 0.65]} color="#1b1c1e" />
  </group>;
}
