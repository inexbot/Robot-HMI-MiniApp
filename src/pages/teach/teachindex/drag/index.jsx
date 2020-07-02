import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput, AtSlider } from "taro-ui";
import Header from "../../../../component/header";
import { TeachBar } from "../../../../component/footer";
import "./index.less";
import { EmergencyStopButton } from "../../../../component/buttons";

function DragIndex() {
  const handleStartDrag = () => {
    console.log("开始拖拽");
    switchDragView(Draging);
  };
  const handlePlayback = () => {
    Taro.navigateTo({
      url: "/pages/teach/teachindex/drag/playback/index",
    });
  };
  const Dragst = (
    <View className="teach-index">
      <AtButton
        type="primary"
        className="teach-index-button"
        onClick={handleStartDrag}
      >
        开始拖拽
      </AtButton>
      <AtButton
        type="secondary"
        className="teach-index-button"
        onClick={handlePlayback}
      >
        轨迹回放
      </AtButton>
    </View>
  );
  const [dragView, switchDragView] = useState(Dragst);
  const [speed, setSpeed] = useState(5);
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
  const saveTrajectory = () => {
    console.log("保存轨迹");
    switchDragView(Dragst);
    return;
  };
  const giveupTrajectory = () => {
    console.log("放弃轨迹");
    switchDragView(Dragst);
    return;
  };
  const handlePauseButton = () => {
    console.log("暂停拖拽");
    switchDragView(Pause);
  };
  const handleContinueDrag = () => {
    console.log("继续拖拽");
    switchDragView(Draging);
  };
  const handleStopDrag = () => {
    console.log("停止拖拽");
    switchDragView(Stop);
  };

  const Draging = (
    <View className="teach-index">
      <AtButton
        type="primary"
        className="teach-index-button"
        customStyle={{ background: "#555555", color: "white" }}
        onClick={handlePauseButton}
      >
        暂停拖拽
      </AtButton>
    </View>
  );
  const Pause = (
    <View className="teach-index">
      <AtButton
        type="primary"
        className="teach-index-button"
        onClick={handleContinueDrag}
      >
        继续拖拽
      </AtButton>
      <AtButton
        type="secondary"
        className="teach-index-button"
        customStyle={{ background: "#555555", color: "white" }}
        onClick={handleStopDrag}
      >
        停止拖拽
      </AtButton>
    </View>
  );
  const Save = (
    <View className="teach-index">
      <Text>轨迹名</Text>
      <AtInput />
      <AtButton>保存轨迹</AtButton>
    </View>
  );
  const Stop = (
    <View className="teach-index">
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
      <Button onLongPress={backPoint} onTouchEnd={stopBackPoint}>
        回到起点（持续按住）
      </Button>
      <Button onLongPress={backTrajectory} onTouchEnd={stopBackTrajectory}>
        回放轨迹（持续按住）
      </Button>
      <AtButton
        type="primary"
        className="teach-index-button"
        onClick={saveTrajectory}
      >
        保存轨迹
      </AtButton>
      <AtButton
        type="secondary"
        className="teach-index-button"
        customStyle={{ background: "#555555", color: "white" }}
        onClick={giveupTrajectory}
      >
        放弃轨迹
      </AtButton>
    </View>
  );

  return (
    <View className="teach">
      <Header />
      {dragView}
      <View className="emergency">
        <EmergencyStopButton />
      </View>
      <TeachBar />
    </View>
  );
}

export default DragIndex;
