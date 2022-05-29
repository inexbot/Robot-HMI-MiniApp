import { useEffect } from "react";
import { connect } from "react-redux";
import { View, Text, Image } from "@tarojs/components";

import { RobotStatus, Command } from "../../lib/nexdroid";
import Tcp from "../../lib/tcp";
import Speed from "../../../asset/speed.png";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    teachSpeed: state.robotStatus.teachSpeed,
  };
};

function SpeedState({ teachSpeed, className }) {
  let getSpeedData: RobotStatus.SpeedGet = { robot: 1 };
  useEffect(() => {
    tcp.sendMessage(Command.SpeedGet, getSpeedData);
  }, []);
  return (
    <View className={className}>
      <View>
        <Image src={Speed} />
      </View>
      <Text>{teachSpeed}%</Text>
    </View>
  );
}

export default connect(mapStateToProps)(SpeedState);
