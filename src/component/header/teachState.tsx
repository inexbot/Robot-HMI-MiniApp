import { View, Text } from "@tarojs/components";
import { TCPSocket } from "@tarojs/taro";
import { useEffect } from "react";
import { connect } from "react-redux";
import { RobotStatus, Command } from "../../lib/nexdroid";
import Tcp from "../../lib/tcp";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    operaMode: state.robotStatus.operaMode,
  };
};
function TeachState({ operaMode }) {
  useEffect(() => {
    let data: RobotStatus.OperaModeGetInterface = {};
    let command = Command.OperaModeGet;
    tcp.sendMessage(command, data);
  }, []);
  function changeOperaMode() {
    if (operaMode == RobotStatus.OperaMode.Teach) {
      return;
    }
    let data: RobotStatus.OperaModeSetInterface = {
      mode: (operaMode = RobotStatus.OperaMode.Teach),
    };
    tcp.sendMessage(Command.OperaModeSet, data);
  }
  return (
    <View onClick={changeOperaMode}>
      <Text>{operaMode == 0 ? "示教" : "切示教"}</Text>
    </View>
  );
}

export default connect(mapStateToProps)(TeachState);
