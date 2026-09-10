import { RoomModel } from "./RoomModel";
import { roomSceneConfig } from "../roomSceneConfig";
import { MonitorScreen } from "../MonitorScreen";

export function MonitorModel() {
  return <><RoomModel placement={roomSceneConfig.monitor} /><MonitorScreen /></>;
}
