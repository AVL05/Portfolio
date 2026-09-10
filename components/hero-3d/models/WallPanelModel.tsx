import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function WallPanelModel() {
  return <RoomModel placement={roomSceneConfig.wallPanel} />;
}
