import { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";
import { AtSlider } from "taro-ui";

import { RobotStatus, Command } from "../../../lib/nexdroid";
import Tcp from "../../../lib/tcp";
import "./speed.module.less";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    teachSpeed: state.robotStatus.teachSpeed,
  };
};

function Speed({ teachSpeed }) {
  useEffect(() => {
    let getSpeedData: RobotStatus.SpeedGet = { robot: 1 };
    tcp.sendMessage(Command.SpeedGet, getSpeedData);
  }, []);
  function changeSpeed(value) {
    let setSpeedData: RobotStatus.SpeedSet = {
      robot: 1,
      teachspeed: value,
      runspeed: value,
    };
    tcp.sendMessage(Command.SpeedSet, setSpeedData);
  }

  return (
    <View className="speed">
      <Text>速度:{teachSpeed}%</Text>
      <AtSlider
        step={2}
        value={teachSpeed}
        activeColor="#4285F4"
        backgroundColor="#BDBDBD"
        blockColor="#4285F4"
        blockSize={24}
        onChange={changeSpeed}
        className="slider"
      />
    </View>
  );
}

export default connect(mapStateToProps)(Speed);
