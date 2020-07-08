import React, { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "react-redux";
import "./index.less";
import { sendMSGtoController } from "../../service/network";
const mapStateToProps = (state) => {
  return {
    connected: state.localState.connected,
    servoState: state.robotStatus.currentRobotServoState,
    deadmanState: state.robotStatus.deadmanState,
  };
};

function Header(props) {
  const [connectStatusCircle, setConnectStatusCircle] = useState("green");
  const [servoStatusCircle, setServoStatusCircle] = useState("#dddddd");
  const [deadmanStatusCircle, setDeadmanStatusCircle] = useState("green");
  useEffect(() => {
    let connected = props.connected;
    switch (connected) {
      case 0:
        setConnectStatusCircle("#dddddd");
        break;
      case 1:
        setConnectStatusCircle("green");
        break;
      case 2:
        setConnectStatusCircle("red");
        break;
      default:
        break;
    }
  }, [props.connected]);
  useEffect(() => {
    let servo = props.servoState;
    switch (servo) {
      case 0:
        setServoStatusCircle("#dddddd");
        break;
      case 1:
        setServoStatusCircle("yellow");
        break;
      case 2:
        setServoStatusCircle("red");
        break;
      case 3:
        setServoStatusCircle("green");
        break;
      default:
        break;
    }
  }, [props.servoState]);
  useEffect(() => {
    if (props.deadmanState === 0) {
      setDeadmanStatusCircle("#dddddd");
    } else if (props.deadmanState === 1) {
      setDeadmanStatusCircle("green");
    }
  }, [props.deadmanState]);
  const clickServo = () => {
    if (servoStatusCircle === "#dddddd") {
      let servoData1 = {
        robot: 1,
        status: 1,
      };
      sendMSGtoController("SERVO_STATUS_SET", servoData1);
    } else if (servoStatusCircle === "yellow") {
      let servoData2 = {
        robot: 1,
        status: 0,
      };
      sendMSGtoController("SERVO_STATUS_SET", servoData2);
    } else if (servoStatusCircle === "red") {
      let servoData3 = {
        robot: 1,
      };
      sendMSGtoController("FAULT_RESET", servoData3);
    }
  };
  const clickDeadman = () => {
    if (deadmanStatusCircle === "#dddddd") {
      let deadmanData = {
        deadman: 1,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
      setDeadmanStatusCircle("green");
    } else if (deadmanStatusCircle === "green") {
      let deadmanData1 = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData1);
      setDeadmanStatusCircle("#dddddd");
    }
  };
  return (
    <View className="header">
      <View className="status">
        <View className="status-con">
          <Image
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/link.png"
            className="icon"
            alt=""
            mode="aspectFit"
          />
          <Text>连接</Text>
          <View
            className="circle-status"
            style={{ background: connectStatusCircle }}
          ></View>
        </View>
        <View className="status-con" onClick={clickServo}>
          <Image
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/servo.png"
            className="icon"
            alt=""
            mode="aspectFit"
          />
          <Text>伺服</Text>
          <View
            className="circle-status"
            style={{ background: servoStatusCircle }}
          ></View>
        </View>
        <View className="status-con" onClick={clickDeadman}>
          <Image
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/power.png"
            className="icon"
            alt=""
            mode="aspectFit"
          />
          <Text>上电</Text>
          <View
            className="circle-status"
            style={{ background: deadmanStatusCircle }}
          ></View>
        </View>
        <View className="status-con">
          <Image
            src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/speed.png"
            className="icon"
            alt=""
            mode="aspectFit"
          />
          {/* <Text>速度</Text> */}
          <Text>30%</Text>
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(Header);
