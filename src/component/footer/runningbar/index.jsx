import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtTabBar } from "taro-ui";

function RunningBar(props) {
  const [runMode, setRunMode] = useState("运行");
  const tabList = [{ title: "示教模式" }, { title: runMode }];
  const handleClick = (value) => {
    console.log(value);
    if (value === 0) {
      Taro.redirectTo({
        url: "/pages/program/program/index",
      });
    } else if (value === 1) {
      if (runMode === "运行") {
        console.log("开始运行");
        setRunMode("暂停");
      } else if (runMode === "暂停") {
        console.log("暂停");
        setRunMode("运行");
      }
    }
    return;
  };

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} />
    </View>
  );
}

export default RunningBar;
