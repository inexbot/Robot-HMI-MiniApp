import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "@tarojs/components";

import { RobotStatus, Command } from "../../lib/nexdroid";
import Deadman from "../../../asset/deadman.png";
import Tcp from "../../lib/tcp";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    deadman: state.robotStatus.deadman,
  };
};

function DeadmanState({ deadman, className }) {
  const [deadmanState, setDeadmanState] = useState(deadman);
  let getDeadmanData: RobotStatus.DeadmanGetInterface = {};
  useEffect(() => {
    tcp.sendMessage(Command.DeadmanGet, getDeadmanData);
  }, []);
  function switchDeadman() {
    let data: RobotStatus.DeadmanSetInterface;
    if (deadmanState == RobotStatus.Deadman.disable) {
      data = { deadman: RobotStatus.Deadman.enable };
      setDeadmanState(RobotStatus.Deadman.enable);
    } else {
      data = { deadman: RobotStatus.Deadman.disable };
      setDeadmanState(RobotStatus.Deadman.disable);
    }
    tcp.sendMessage(Command.DeadmanSet, data);
  }
  return (
    <View onClick={switchDeadman} className={className}>
      <View>
        <Image src={Deadman} />
      </View>
      <View
        className="spot"
        style={{
          background: deadmanState ? "rgb(58,247,165)" : "rgb(247,58,58)",
        }}
      ></View>

      <Text>{deadmanState ? "已使能" : "未使能"}</Text>
    </View>
  );
}

export default connect(mapStateToProps)(DeadmanState);
