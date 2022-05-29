import { useEffect } from "react";
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
  let getDeadmanData: RobotStatus.DeadmanGetInterface = {};
  useEffect(() => {
    tcp.sendMessage(Command.DeadmanGet, getDeadmanData);
  }, []);
  function switchDeadman() {
    let data: RobotStatus.DeadmanSetInterface;
    if (deadman) {
      data = { deadman: RobotStatus.Deadman.disable };
    } else {
      data = { deadman: RobotStatus.Deadman.enable };
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
        style={{ background: deadman ? "rgb(58,247,165)" : "rgb(247,58,58)" }}
      ></View>

      <Text>{deadman ? "已使能" : "未使能"}</Text>
    </View>
  );
}

export default connect(mapStateToProps)(DeadmanState);
