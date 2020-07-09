import React from "react";
import { View, Button, Text } from "@tarojs/components";
import { AtTabBar } from "taro-ui";

function ProgramBar(props) {
  const tabList = [{ title: "切换到运行模式" }];
  const handleClick = (value) => {
    console.log(value);
    return;
  };

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} />
    </View>
  );
}

export default ProgramBar;
