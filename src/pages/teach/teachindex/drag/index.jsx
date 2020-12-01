import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import {
  AtForm,
  AtButton,
  AtInput,
  AtSlider,
  AtModal,
  AtModalHeader,
  AtModalContent,
  AtModalAction,
} from "taro-ui";
import Header from "../../../../component/header";
import "./index.less";
import { EmergencyStopButton } from "../../../../component/buttons";
import { sendMSGtoController } from "../../../../service/network";
const mapStateToProps = (state) => {
  return {
    currentRobotServoState: state.robotStatus.currentRobotServoState,
    deadmanState: state.robotStatus.deadmanState,
  };
};
function DragIndex(props) {
  const [modalOpened, setModalOpened] = useState(false);
  const [tName, setTName] = useState("");
  useEffect(() => {
    return () => {
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
    };
  }, []);
  const handleStartDrag = () => {
    console.log("开始拖拽");
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 1 });
    switchDragView(Draging);
  };
  useEffect(() => {
    if (props.deadmanState === 1 && props.currentRobotServoState === 3) {
      sendMSGtoController("DRAG_TRAJ_PARAM_SET", {
        SamplingInterval: 0.03,
        MaxSamplingNum: 2000,
        Start: true,
      });
      switchDragView(Draging);
    }
  }, [props.deadmanState, props.currentRobotServoState]);
  const handlePlayback = () => {
    Taro.navigateTo({
      url: "/pages/teach/teachindex/drag/playback/index",
    });
  };
  const Dragst = (
    <View className="teach-index">
      <AtButton
        type="primary"
        customStyle={{
          color: "white",
          backgroundColor: "rgb(97, 144, 232)",
          // border: "1px solid #ff463d",
          width: "180px",
          height: "180px",
          borderRadius: 90,
          fontSize: "18px",
          marginBottom: "5vh",
          padding: 70,
        }}
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
  const backTrajectory = () => {
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 1 });
    sendMSGtoController("DRAG_TRAJ_PLAYBACK", {
      mode: 1,
      vel: 100,
      trajName: "",
    });
    return;
  };
  const saveTrajectory = () => {
    setModalOpened(true);
    return;
  };
  const giveupTrajectory = () => {
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 0 });
    sendMSGtoController("DRAG_TRAJ_SAVE", { TrajName: "" });
    switchDragView(Dragst);
    return;
  };
  const handleStopDrag = () => {
    sendMSGtoController("DRAG_TRAJ_PARAM_SET", {
      SamplingInterval: 0.03,
      MaxSamplingNum: 2000,
      Start: false,
    });
    switchDragView(Stop);
  };
  const handleSaveT = () => {
    sendMSGtoController("DRAG_TRAJ_SAVE", { TrajName: tName });
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 0 });
    setModalOpened(false);
    switchDragView(Dragst);
  };

  const Draging = (
    <View className="teach-index">
      <View className="teach-circle">
        <AtButton
          type="primary"
          className="teach-index-button"
          customStyle={{
            background: "#fff",
            color: "#ff463d",
            border: "1px solid #ff463d",
            width: "180px",
            height: "180px",
            borderRadius: 90,
            fontSize: "18px",
            padding: 70,
          }}
          onClick={handleStopDrag}
        >
          停止拖拽
        </AtButton>
      </View>
    </View>
  );
  const Save = (
    <View className="teach-index" style="margin-top:10vh">
      <Text>轨迹名</Text>
      {/* <AtInput /> */}
      <AtButton
        customStyle={{
          background: "#55d676",
          color: "white",
          border: "1px solid #39b659",
        }}
      >
        保存轨迹
      </AtButton>
    </View>
  );
  const Stop = (
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
      {/* <View style="display:flex;flex-flow:row;margin-bottom:20px">
        <Button
          onLongPress={backPoint}
          onTouchEnd={stopBackPoint}
          className="back1"
        >
          回到起点
        </Button>
      </View> */}
      <Button onClick={backTrajectory} className="back2">
        回放轨迹
      </Button>
      <AtButton
        type="primary"
        className="teach-index-button"
        customStyle={{
          background: "#55d676",
          color: "white",
          border: "1px solid #39b659",
        }}
        onClick={saveTrajectory}
      >
        保存轨迹
      </AtButton>
      <AtButton
        type="secondary"
        className="teach-index-button"
        customStyle={{
          background: "#fff",
          color: "#ff463d",
          border: "1px solid #ff463d",
        }}
        onClick={giveupTrajectory}
      >
        放弃轨迹
      </AtButton>
    </View>
  );

  return (
    <View className="teach">
      <Header />
      <AtModal isOpened={modalOpened} closeOnClickOverlay={false}>
        <AtModalHeader>轨迹命名</AtModalHeader>
        <AtModalContent>
          <AtInput
            value={tName}
            onChange={(value) => {
              setTName(value);
            }}
          />
        </AtModalContent>
        <AtModalAction>
          <Button>取消</Button>
          <Button onClick={handleSaveT}>确定</Button>
        </AtModalAction>
      </AtModal>
      {dragView}
      <View className="emergency">
        <EmergencyStopButton />
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(DragIndex);
