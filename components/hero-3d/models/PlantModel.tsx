import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function PlantModel() {
  return <RoomModel placement={roomSceneConfig.plant} />;
}
