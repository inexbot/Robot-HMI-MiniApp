import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";

import { RobotStatus, Command, Operation } from "../../../lib/nexdroid";
import Tcp from "../../../lib/tcp";
import "./jog.module.less";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    coordinate: state.robotStatus.coordinate,
    pos: state.robotStatus.pos,
  };
};

function Jog({ coordinate, pos }) {
  const [name, setName] = useState(["", "", "", "", "", ""]);

  useEffect(() => {
    let getPosInterval = setInterval(() => {
      let data: RobotStatus.PosGet = { robot: 1, coord: coordinate };
      tcp.sendMessage(Command.PosGet, data);
    }, 1000);

    return () => {
      clearInterval(getPosInterval);
    };
  }, []);
  useEffect(() => {
    switch (coordinate) {
      case RobotStatus.Coordinate.Joint:
        setName(["J1", "J2", "J3", "J4", "J5", "J6"]);
        break;
      case RobotStatus.Coordinate.Cart:
        setName(["X", "Y", "Z", "A", "B", "C"]);
        break;
      case RobotStatus.Coordinate.Tool:
        setName(["TX", "TY", "TZ", "TA", "TB", "TC"]);
        break;
      case RobotStatus.Coordinate.User:
        setName(["UX", "UY", "UZ", "UA", "UB", "UC"]);
        break;
      default:
        break;
    }
  }, [coordinate]);

  const JogItem = (axis) => {
    let jogInterval: NodeJS.Timer;
    function beginJog(direction: Operation.Direction) {
      if (jogInterval) {
        clearInterval(jogInterval);
      }
      jogInterval = setInterval(() => {
        let data: Operation.JogStart = { axis: axis + 1, direction: direction };
        tcp.sendMessage(Command.JogStart, data);
        console.log(axis);
      }, 200);
    }
    function stopJog() {
      clearInterval(jogInterval);
      console.log(axis + "stop");
      let data: Operation.JogStop = { axis: axis + 1 };
      tcp.sendMessage(Command.JogStop, data);
    }

    return (
      <View className="jogModule">
        <View
          onTouchEnd={stopJog}
          onTouchStart={beginJog.bind(this, Operation.Direction.Reverse)}
          onTouchCancel={stopJog}
          onTouchMove={stopJog}
          className="jogButton"
        >
          <Text>{name[axis]}-</Text>
        </View>
        <Text className="jogText">{pos[axis]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog}
          onTouchStart={beginJog.bind(this, Operation.Direction.Forward)}
          onTouchCancel={stopJog}
          onTouchMove={stopJog}
        >
          <Text>{name[axis]}+</Text>
        </View>
      </View>
    );
  };
  return (
    <View className="jog">
      {name.map((v, i) => {
        return JogItem(i);
      })}
    </View>
  );
}

export default connect(mapStateToProps)(Jog);
