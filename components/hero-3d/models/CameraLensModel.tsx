import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function CameraLensModel() {
  return <RoomModel placement={roomSceneConfig.cameraLens} />;
}
