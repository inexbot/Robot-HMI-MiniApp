import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";

import { RobotStatus, Command } from "../../../lib/nexdroid";
import Tcp from "../../../lib/tcp";
import { AtActionSheet, AtActionSheetItem, AtButton, AtInput } from "taro-ui";
import "./coordinate.module.less";

const tcp = Tcp.getInstance();

const mapStateToProps = (state) => {
  return {
    coordinate: state.robotStatus.coordinate,
    userCoord: state.robotStatus.userCoord,
    toolCoord: state.robotStatus.toolCoord,
  };
};

function SpeedState({ coordinate, userCoord, toolCoord }) {
  const [actionSheetOpened, setActionSheepOpened] = useState(false);
  const [coordinateText, setCoordinateText] = useState("无");
  const [toolCoordValue, setToolCoordValue] = useState(0);
  const [userCoordValue, setUserCoordValue] = useState(0);

  let getCoordinateData: RobotStatus.CoordinateGetInterface = { robot: 1 };
  let getToolCoordData: RobotStatus.ToolCoordGet = { robot: 1 };
  let getUserCoordData: RobotStatus.UserCoordGet = { robot: 1 };
  useEffect(() => {
    tcp.sendMessage(Command.CoordinateGet, getCoordinateData);
    tcp.sendMessage(Command.ToolCoordGet, getToolCoordData);
    tcp.sendMessage(Command.UserCoordGet, getUserCoordData);
  }, []);
  useEffect(() => {
    switch (coordinate) {
      case RobotStatus.Coordinate.Joint:
        setCoordinateText("关节");
        break;
      case RobotStatus.Coordinate.Cart:
        setCoordinateText("直角");
        break;
      case RobotStatus.Coordinate.Tool:
        setCoordinateText("工具");
        break;
      case RobotStatus.Coordinate.Tool:
        setCoordinateText("用户");
        break;

      default:
        break;
    }
  }, [coordinate]);
  useEffect(() => {
    setToolCoordValue(toolCoord);
    setUserCoordValue(userCoord);
  }, [toolCoord, userCoord]);
  function changeToolCoordValue(e) {
    setToolCoordValue(e);
  }
  function confirmToolCoordValue(e) {
    let data: RobotStatus.ToolCoordSet = {
      robot: 1,
      curToolNum: Number(e),
    };
    if (!e) {
      return;
    }
    tcp.sendMessage(Command.ToolCoordSet, data);
  }
  function changeUserCoordValue(e) {
    setToolCoordValue(e);
  }
  function confirmUserCoordValue(e) {
    let data: RobotStatus.UserCoordSet = { robot: 1, userNum: Number(e) };
    if (!e) {
      return;
    }
    tcp.sendMessage(Command.ToolCoordSet, data);
  }
  function switchCoordinate(coord: RobotStatus.Coordinate) {
    let setCoordinateData: RobotStatus.CoordinateSetInterface = {
      robot: 1,
      coord: coord,
    };
    tcp.sendMessage(Command.CoordinateSet, setCoordinateData);
    setActionSheepOpened(false);
  }
  return (
    <View className="coordinate">
      <AtActionSheet cancelText="关闭" isOpened={actionSheetOpened}>
        <AtActionSheetItem
          onClick={switchCoordinate.bind(this, RobotStatus.Coordinate.Joint)}
        >
          关节
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={switchCoordinate.bind(this, RobotStatus.Coordinate.Cart)}
        >
          直角
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={switchCoordinate.bind(this, RobotStatus.Coordinate.Tool)}
        >
          工具
        </AtActionSheetItem>
        <AtActionSheetItem
          onClick={switchCoordinate.bind(this, RobotStatus.Coordinate.User)}
        >
          用户
        </AtActionSheetItem>
      </AtActionSheet>
      <View className="coord">
        <Text>坐标系</Text>
        <AtButton
          onClick={() => {
            setActionSheepOpened(true);
          }}
        >
          {coordinateText}
        </AtButton>
      </View>
      <View className="tool">
        <Text>工具</Text>
        <AtInput
          type="number"
          confirmType="切换"
          value={toolCoordValue}
          adjustPosition={false}
          onChange={changeToolCoordValue}
          onConfirm={confirmToolCoordValue}
        />
      </View>
      <View className="user">
        <Text>用户</Text>
        <AtInput
          confirmType="切换"
          value={userCoordValue}
          adjustPosition={false}
          onChange={changeUserCoordValue}
          onConfirm={confirmUserCoordValue}
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(SpeedState);
