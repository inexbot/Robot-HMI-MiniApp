import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { connect } from "react-redux";
import { AtTabBar } from "taro-ui";
import { sendMSGtoController } from "../../../service/network";

const mapStateToProps = state => {
  return {
    servoState: state.robotStatus.currentRobotServoState,
    pos:state.robotStatus.pos
  };
};

function TeachBar(props) {
  const [servoState, setServoState] = useState("伺服停止");
  const [deadmanState, setDeadmanState] = useState("上电");
  useEffect(() => {
    switch (props.servoState) {
      case 0:
        setServoState("伺服停止");
        break;
      case 1:
        setServoState("伺服准备");
        break;
      case 3:
        setServoState("伺服运行");
        break;
      case 2:
        setServoState("伺服停止");
        break;
      default:
        break;
    }
  }, [props.servoState]);
  const tabList = [{ title: servoState }, { title: deadmanState }];
  const handleClick = val => {
    switch (val) {
      case 0:
        if(servoState === "伺服停止"){
          let servoData1 = {
            robot: 1,
            status: 1,
          };
          sendMSGtoController("SERVO_STATUS_SET", servoData1);
        } else{
          let servoData2 = {
            robot: 1,
            status: 0,
          };
          sendMSGtoController("SERVO_STATUS_SET", servoData2);
        }
        break;
      case 1:
        if (deadmanState === "上电") {
          let deadmanData = {
            deadman: 1,
          };
          sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
          setDeadmanState("下电");
        } else if (deadmanState === "下电") {
          let deadmanData1 = {
            deadman: 0,
          };
          sendMSGtoController("DEADMAN_STATUS_SET", deadmanData1);
          setDeadmanState("上电");
        }
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
