import { Vector3 } from "three";
import { roomCameraConfig as config } from "./roomSceneConfig";

// Fit the room corners to the viewport while keeping the same cinematic angle.
export function getRoomCameraPosition(aspect: number): Vector3 {
  const target = new Vector3(...config.target);
  const direction = new Vector3(...config.position).sub(target).normalize();
  const right = new Vector3(0, 1, 0).cross(direction).normalize();
  const up = direction.clone().cross(right);
  const tanY = Math.tan(config.fov * Math.PI / 360);
  const tanX = tanY * Math.max(aspect, 0.1);
  let distance = 0;
  for (const x of [config.bounds.min[0], config.bounds.max[0]]) {
    for (const y of [config.bounds.min[1], config.bounds.max[1]]) {
      for (const z of [config.bounds.min[2], config.bounds.max[2]]) {
        const corner = new Vector3(x, y, z).sub(target);
        const span = Math.max(Math.abs(corner.dot(right)) / tanX, Math.abs(corner.dot(up)) / tanY);
        distance = Math.max(distance, corner.dot(direction) + span * config.margin);
      }
    }
  }
  return target.addScaledVector(direction, distance);
}
