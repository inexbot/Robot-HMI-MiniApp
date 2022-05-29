import { View } from "@tarojs/components";
import ConnectState from "./connectState";
import DeadmanState from "./deadmanState";
import ServoStatus from "./servoStatus";
import SpeedState from "./speedState";
import "./index.less";

export default function Header() {
  return (
    <View>
      <View className="at-row at-row__justify--around">
        <ConnectState className="item at-col-5" />
        <ServoStatus className="item at-col-5" />
      </View>
      <View className="at-row at-row__justify--around">
        <DeadmanState className="item at-col-5" />
        <SpeedState className="item at-col-5" />
      </View>
    </View>
  );
}
