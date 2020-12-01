import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { View } from "@tarojs/components";
import { useEffect } from "react";
import { AtList, AtListItem } from "taro-ui";
import { sendMSGtoController } from "../../service/network";
const mapStateToProps = (state) => {
  return {
    trajectories: state.dragTrajectory.TrajName,
  };
};
function Trajectory(props) {
  const [trajectory, setTrajectory] = useState([]);
  useEffect(() => {
    if (props.trajectories === []) {
      setTrajectory(["无"]);
      return;
    }
    let _t = props.trajectories;
    let _l = [];
    _t.forEach((value) => {
      _l.push(
        <AtListItem
          title={value}
          arrow="right"
          onClick={handleClickTraj.bind(this, value)}
          key={value}
        />
      );
    });
    setTrajectory(_l);
  }, [props.trajectories]);
  useEffect(() => {
    sendMSGtoController("SERVO_STATUS_SET", { robot: 1, status: 1 });
    sendMSGtoController("DRAG_TRAJ_INQUIRE", "");
  }, []);
  function handleClickTraj(value) {
    Taro.navigateTo({
      url: `/pages/trajectory/playback/index?tname=${value}`,
    });
  }
  return (
    <View>
      <AtList>{trajectory}</AtList>
    </View>
  );
}

export default connect(mapStateToProps)(Trajectory);
