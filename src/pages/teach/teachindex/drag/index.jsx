import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import {
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
import { WaitEnable } from "../../../../component/wait";
const mapStateToProps = (state) => {
  return {
    connected: state.localState.connected,
    servoState: state.robotStatus.currentRobotServoState,
    deadmanState: state.robotStatus.deadmanState,
    DragBtnType: state.dragTrajectory.DragBtnType,
  };
};
function DragIndex(props) {
  const [modalOpened, setModalOpened] = useState(false);
  const [tName, setTName] = useState("");
  const [waitOpened, setWaitOpened] = useState(false);
  const [eleBtnType, setEleBtnType] = useState(0); // 0: 无状态  1: 点击开始拖拽/停止拖拽  2：点击回放轨迹 
  const [dragView, switchDragView] = useState(
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
  </View>);

  // 修改拖拽示教记录开始按钮状态
  const changesetDragType = value => {
    props.dispatch({
      type: 'dragTrajectory/changeDragBtnType',
      data: {
        MaxSamplingNum: 2000,
        SamplingInterval: 0.03,
        Start: value,
      },
    });
  };
  useEffect(() => {
    return () => {
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
    };
  }, []);

  const handleStopDrag = () => {
    sendMSGtoController("DRAG_TRAJ_PARAM_SET", {
      SamplingInterval: 0.03,
      MaxSamplingNum: 2000,
      Start: false,
    });
    // switchDragView(Stop);
  };

  const backTrajectory = () => {
    setEleBtnType(2);
    return;
  };

  const giveupTrajectory = () => {
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 0 });
    sendMSGtoController("DRAG_TRAJ_SAVE", { TrajName: "" });
    switchDragView(Dragst);
    changesetDragType(true);
    return;
  };

  const saveTrajectory = () => {
    setModalOpened(true);
    return;
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

  useEffect(() => {
    function wait() {
      sendMSGtoController("DRAG_TRAJ_PARAM_SET", {
        SamplingInterval: 0.03,
        MaxSamplingNum: 2000,
        Start: true,
      });
      setWaitOpened(false);
      switchDragView(Draging);
    }
    if (props.deadmanState === 1 && props.servoState === 3){
      if(eleBtnType === 1){
        setWaitOpened(true);
        wait();
        setEleBtnType(3);
      }else if( eleBtnType === 2 ){
        sendMSGtoController("DRAG_TRAJ_PLAYBACK", {
          mode: 1,
          vel: 100,
          trajName: "",
        });
        setWaitOpened(false);
        // sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 1 }).then(() => {
          // setWaitOpened(true);
          // wait();
        // });
      }
    }
  }, [props.deadmanState, props.servoState,eleBtnType]);
  const handlePlayback = () => {
    Taro.navigateTo({
      url: "/pages/teach/teachindex/drag/playback/index",
    });
  };
  
  function handleStartDrag() {
    setEleBtnType(1);
    changesetDragType(true);
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 1 });
  }
  const [speed, setSpeed] = useState(5);
  const changeSpeed = (val) => {
    setSpeed(val);
  };

  const handleSaveT = () => {
    sendMSGtoController("DRAG_TRAJ_SAVE", { TrajName: tName });
    sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 0 });
    setModalOpened(false);
    switchDragView(Dragst);
    changesetDragType(true);
  };

  useEffect(()=>{
    if( eleBtnType === 3 ){
      if( props.DragBtnType === true ){
        switchDragView(Stop);
      }
    }
  },[props.DragBtnType,eleBtnType])

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


  return (
    <View className="teach">
      <Header />
      <WaitEnable isOpened={waitOpened} />
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
          <Button onClick={()=>{setModalOpened(false)}}>取消</Button>
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
