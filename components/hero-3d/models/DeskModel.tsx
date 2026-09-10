import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function DeskModel() {
  return <RoomModel placement={roomSceneConfig.desk} />;
}
