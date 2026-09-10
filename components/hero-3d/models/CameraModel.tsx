import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function CameraModel() {
  return <RoomModel placement={roomSceneConfig.camera} />;
}
