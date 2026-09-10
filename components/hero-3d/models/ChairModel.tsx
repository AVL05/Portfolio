import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function ChairModel() {
  return <RoomModel placement={roomSceneConfig.chair} />;
}
