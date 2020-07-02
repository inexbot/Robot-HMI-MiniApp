import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import { AtTabBar } from "taro-ui";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};

function TeachBar(props) {
  const [servoState, setServoState] = useState("伺服准备");
  const [deadmanState, setDeadmanState] = useState("使能");
  useEffect(() => {}, []);
  const tabList = [{ title: servoState }, { title: deadmanState }];
  const handleClick = val => {
    switch (val) {
      case 0:
        console.log("切换伺服状态");
        break;
      case 1:
        console.log("使能");
        break;
      default:
        break;
    }
    return;
  };

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} current={3} />
    </View>
  );
}

export default connect(mapStateToProps)(TeachBar);
