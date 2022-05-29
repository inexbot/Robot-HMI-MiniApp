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
  let jogInterval: NodeJS.Timer;
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
  function beginJog(axis: number, direction: Operation.Direction) {
    jogInterval = setInterval(() => {
      let data: Operation.JogStart = { axis: axis, direction: direction };
      tcp.sendMessage(Command.JogStart, data);
    }, 200);
  }
  function stopJog(axis: number) {
    clearInterval(jogInterval);
    let data: Operation.JogStop = { axis: axis };
    tcp.sendMessage(Command.JogStop, data);
  }
  return (
    <View className="jog">
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 1)}
          onTouchStart={beginJog.bind(this, 1, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 1)}
          className="jogButton"
        >
          <Text>{name[0]}-</Text>
        </View>
        <Text className="jogText">{pos[0]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 1)}
          onTouchStart={beginJog.bind(this, 1, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 1)}
        >
          <Text>{name[0]}+</Text>
        </View>
      </View>
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 2)}
          onTouchStart={beginJog.bind(this, 2, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 2)}
          className="jogButton"
        >
          <Text>{name[1]}-</Text>
        </View>
        <Text className="jogText">{pos[1]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 2)}
          onTouchStart={beginJog.bind(this, 2, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 2)}
        >
          <Text>{name[1]}+</Text>
        </View>
      </View>
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 3)}
          onTouchStart={beginJog.bind(this, 3, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 3)}
          className="jogButton"
        >
          <Text>{name[2]}-</Text>
        </View>
        <Text className="jogText">{pos[2]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 3)}
          onTouchStart={beginJog.bind(this, 3, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 3)}
        >
          <Text>{name[2]}+</Text>
        </View>
      </View>
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 4)}
          onTouchStart={beginJog.bind(this, 4, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 4)}
          className="jogButton"
        >
          <Text>{name[3]}-</Text>
        </View>
        <Text className="jogText">{pos[3]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 4)}
          onTouchStart={beginJog.bind(this, 4, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 4)}
        >
          <Text>{name[3]}+</Text>
        </View>
      </View>
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 5)}
          onTouchStart={beginJog.bind(this, 5, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 5)}
          className="jogButton"
        >
          <Text>{name[4]}-</Text>
        </View>
        <Text className="jogText">{pos[4]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 5)}
          onTouchStart={beginJog.bind(this, 5, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 5)}
        >
          <Text>{name[4]}+</Text>
        </View>
      </View>
      <View className="jogModule">
        <View
          onTouchEnd={stopJog.bind(this, 6)}
          onTouchStart={beginJog.bind(this, 6, Operation.Direction.Reverse)}
          onTouchCancel={stopJog.bind(this, 6)}
          className="jogButton"
        >
          <Text>{name[5]}-</Text>
        </View>
        <Text className="jogText">{pos[5]}</Text>
        <View
          className="jogButton"
          onTouchEnd={stopJog.bind(this, 6)}
          onTouchStart={beginJog.bind(this, 6, Operation.Direction.Forward)}
          onTouchCancel={stopJog.bind(this, 6)}
        >
          <Text>{name[5]}+</Text>
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(Jog);
