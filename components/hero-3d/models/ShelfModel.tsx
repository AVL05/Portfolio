import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function ShelfModel() {
  return <RoomModel placement={roomSceneConfig.shelf} />;
}
