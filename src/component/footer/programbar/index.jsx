import React from "react";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import Taro from "@tarojs/taro";
import { sendMSGtoController } from "../../../service/network";

function ProgramBar(props) {
  const tabList = [{ title: "切换到运行模式" }];
  const handleClick = (value) => {
    console.log(value);
    let data2 = {
      mode: 2,
    };
    sendMSGtoController("OPERATION_MODE_SET", data2);
    Taro.redirectTo({ url: "/pages/program/running/index?name=" + props.name });
    return;
  };

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} />
    </View>
  );
}

export default ProgramBar;
