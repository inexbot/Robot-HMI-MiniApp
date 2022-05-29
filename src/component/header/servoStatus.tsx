import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "@tarojs/components";
import { RobotStatus, Operation, Command } from "../../lib/nexdroid";
import Tcp from "../../lib/tcp";
import Servo from "../../../asset/servo.png";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    servoStatus: state.robotStatus.servoStatus,
  };
};

function ServoStatus({ servoStatus, className }) {
  const [state, setState] = useState("");
  const [color, setColor] = useState("rgb(247,58,58)");
  let getServoStateData: RobotStatus.ServoStatusGetInterface = { robot: 1 };
  console.log(RobotStatus);
  let servoStatusEnum = RobotStatus.ServoStatus;
  useEffect(() => {
    tcp.sendMessage(Command.ServoStatusGet, getServoStateData);
  }, []);
  useEffect(() => {
    switch (servoStatus) {
      case servoStatusEnum.error:
        setState("错误");
        setColor("rgb(247,58,58)");
        break;
      case servoStatusEnum.ready:
        setState("就绪");
        setColor("rgb(157, 255, 0)");
        break;
      case servoStatusEnum.running:
        setState("运行");
        setColor("rgb(58,247,165)");
        break;
      case servoStatusEnum.stop:
        setState("停止");
        setColor("rgb(157, 255, 0)");
        break;

      default:
        break;
    }
  }, [servoStatus]);
  function switchServoState() {
    let switchData: RobotStatus.ServoStatusSetInterface;
    let clearFaultData: Operation.ClearFault = { robot: 1 };
    switch (servoStatus) {
      case RobotStatus.ServoStatus.error:
        tcp.sendMessage(Command.ClearFault, clearFaultData);
        break;
      case RobotStatus.ServoStatus.ready:
        switchData = { robot: 1, status: RobotStatus.ServoStatus.stop };
        tcp.sendMessage(Command.ServoStatusSet, switchData);
        break;
      case RobotStatus.ServoStatus.stop:
        switchData = { robot: 1, status: RobotStatus.ServoStatus.ready };
        tcp.sendMessage(Command.ServoStatusSet, switchData);
        break;
      default:
        break;
    }
  }
  return (
    <View onClick={switchServoState} className={className}>
      <View>
        <Image src={Servo} />
      </View>
      <View className="spot" style={{ background: color }}></View>
      <Text>{state}</Text>
    </View>
  );
}

export default connect(mapStateToProps)(ServoStatus);
