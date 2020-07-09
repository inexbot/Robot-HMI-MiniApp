import React, { useEffect, useState } from "react";
import { View, Button, Text } from "@tarojs/components";
import { AtSlider, AtButton } from "taro-ui";
import Header from "../../../../../../component/header";
import { connect } from "react-redux";
import "./index.less";
import { EmergencyStopButton } from "../../../../../../component/buttons";

const mapStateToProps = (state) => {
  return {
    trajectories: state.dragTrajectory.trajectories,
  };
};

function BackIndex(params) {
  const [speed, setSpeed] = useState(5);
  useEffect(()=>{
    console.log("拖拽回放");
    return()=>{
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
    }
  },[])
  const changeSpeed = (val) => {
    setSpeed(val);
  };
  let backPointInterval;
  let backTrajectoryInterval;
  const backPoint = () => {
    backPointInterval = setInterval(() => {
      console.log("回到起点");
    }, 1000);
    return;
  };
  const stopBackPoint = () => {
    console.log("停止回到起点");
    clearInterval(backPointInterval);
  };
  const backTrajectory = () => {
    backTrajectoryInterval = setInterval(() => {
      console.log("回到轨迹");
    }, 1000);
    return;
  };
  const stopBackTrajectory = () => {
    console.log("停止回到轨迹");
    clearInterval(backTrajectoryInterval);
  };
  const renameTrajectory = () => {
    console.log("重命名轨迹");
  };
  return (
    <View className="teach">
      <Header />
      <View className="teach-index" style="margin-top:10vh">
        <Text>速度：{speed}</Text>
        <AtSlider
          step={5}
          value={speed}
          activeColor="#4285F4"
          backgroundColor="#BDBDBD"
          blockColor="#4285F4"
          blockSize={24}
          onChange={changeSpeed}
        ></AtSlider>
        {/* <AtButton type="primary" className="teach-index-button" onLongPress={backPoint} >
        回到起点（持续按住）
        </AtButton> */}
        <View style="display:flex;flex-flow:row;margin-bottom:20px;">
        <Button onLongPress={backPoint} onTouchEnd={stopBackPoint} className="back1">
          回到起点
        </Button>
        <Button onLongPress={backTrajectory} onTouchEnd={stopBackTrajectory} className="back2">
          回放轨迹
        </Button>
        </View>
        <AtButton
          type="primary"
          className="teach-index-button"
          customStyle={{
            background: "#55d676",
            color: "white",
            border: "1px solid #39b659",
            width:"90vw",
            margin:"0 5vw 5vh 0",
          }}
          onClick={renameTrajectory}
        >
          重命名轨迹
        </AtButton>
      </View>
      <EmergencyStopButton />
    </View>
  );
}

export default connect(mapStateToProps)(BackIndex);
