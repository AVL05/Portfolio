import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";

export function PcModel() {
  return <RoomModel placement={roomSceneConfig.pc} />;
}
