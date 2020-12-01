import React from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Header from "../../component/header";
import "./index.less";
import { sendMSGtoController } from "../../service/network";

function Teach() {
  function handleClick(value) {
    if (value === "drag/index") {
      sendMSGtoController("TEACHTYPE_SET", { teachType: 1 });
      sendMSGtoController("SERVO_STATUS_SET", { robot: 1, status: 1 });
    } else {
      sendMSGtoController("TEACHTYPE_SET", { teachType: 0 });
      sendMSGtoController("SERVO_STATUS_SET", { robot: 1, status: 1 });
      sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 1 });
    }
    let URL = "/pages/teach/teachindex/" + value;
    Taro.navigateTo({
      url: URL,
    });
    return;
  }

  return (
    <View className="teach">
      <Header />
      <Text className="title-top">操作</Text>
      <View style="display:flex;flew-warp:warp;">
        <View
          className="teach-index1"
          onClick={handleClick.bind(this, "drag/index")}
        ></View>
        <View
          className="teach-index2"
          onClick={handleClick.bind(this, "jog/index")}
        ></View>
      </View>
    </View>
  );
}

export default Teach;
