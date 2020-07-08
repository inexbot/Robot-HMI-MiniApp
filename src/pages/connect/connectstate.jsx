import React, { useState, useEffect } from "react";
import Taro, { onSocketOpen, onSocketError, closeSocket } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtModal } from "taro-ui";
import {sendMSGtoController} from "../../service/network"
import {connect} from "react-redux"

const mapStateToProps = (state) => {
  return {
    connected: state.localState.connected,
  };
};

function checkServerState  (){
  sendMSGtoController("CONTROLLER_IP_INQUIRE", "");
  sendMSGtoController("CONTROLLER_ID_INQUIRE", "");
  sendMSGtoController("CURRENT_OPERATION_MODE_INQUIRE", "");
}

function checkRobotState (){
  let curRobot = {
    robot:1
  }
  sendMSGtoController("CURRENT_ROBOT_TYPE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_SERVO_STATE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_RUNNING_STATE_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_SPEED_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_USER_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_TOOL_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_COORD_INQUIRE", curRobot);
  sendMSGtoController("CURRENT_ROBOT_FB_INQUIRE", "");
  sendMSGtoController("CURRENT_ROBOT_ENCODER_STATE_INQUIRE", curRobot);
}

function ConnectState(props) {
  const [connectState, setConnectState] = useState("正在连接...");
  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const [errmsg, setErrmsg] = useState("");
  const [modalOpened, setModalOpened] = useState(false);
  let IP = "ws://" + props.ip + ":" + props.port;
  useEffect(() => {
    console.log(IP);
    Taro.connectSocket({
      url: IP,
    });
  }, []);
  
  onSocketOpen(() => {
    setConnectState("连接成功");
    checkServerState();
    checkRobotState();
    setDisplay1("block");
    props.dispatch({
      type:"localState/setConnected",
      data:1
    });
    setTimeout(() => {
      Taro.reLaunch({ url: "/pages/teach/index" });
    }, 2000);
  });
  onSocketError((erm) => {
    setErrmsg(erm.errMsg);
    setModalOpened(true);
    closeSocket();
  });
  const modalCancel = () => {
    Taro.reLaunch({
      url: "/pages/index/index",
    });
  };
  const modalConfirm = () => {
    Taro.reLaunch({ url: "/pages/teach/index" });
  };
  return (
    <View>
      <AtModal
        content={`连接失败\n${errmsg}\n是否无连接试用？`}
        isOpened={modalOpened}
        confirmText="试用"
        closeOnClickOverlay={false}
        cancelText="返回重连"
        onCancel={modalCancel}
        onConfirm={modalConfirm}
      />
      <View>
        {connectState}
        {IP}
      </View>
      <View style={{ display: display1 }}>
        <Text>正在获取数据...</Text>
      </View>
      <View style={{ display: display2 }}>
        <Text>获取成功</Text>
        <Text>正在跳转</Text>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(ConnectState);
