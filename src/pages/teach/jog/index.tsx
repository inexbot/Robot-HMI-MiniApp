import { View } from "@tarojs/components";
import Header from "../../../component/header";
import Jog from "./jog";
import Speed from "./speed";
import Coordinate from "./coordinate";

export default function JogIndex() {
  return (
    <View>
      <Header />
      <View>
        <Coordinate />
        <Speed />
      </View>
      <Jog />
    </View>
  );
}
