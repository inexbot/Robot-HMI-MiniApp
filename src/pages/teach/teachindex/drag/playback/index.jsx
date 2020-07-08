import React, { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtIndexes } from "taro-ui";
import Header from "../../../../../component/header";
import { connect } from "react-redux";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    trajectories: state.dragTrajectory.trajectories,
  };
};
function PlaybackTrajectory(props) {
  const [trajectoryList, setTrajectoryList] = useState([
    {
      title: "轨迹",
      key: "no",
      items: [
        {
          name: "无轨迹",
          // 此处可加其他业务字段
        },
      ],
    },
  ]);
  const clickListItem = (value) => {
    console.log(value);
    Taro.navigateTo({
      url:
        "/pages/teach/teachindex/drag/playback/backindex/index?name" +
        value.name,
    });
  };
  useEffect(() => {
    let trajectories = props.trajectories;
    let newList = [];
    trajectories.forEach((value, index, array) => {
      let name = value.name;
      newList.push({
        name: name,
      });
    });
    let lis = [
      {
        title: "轨迹",
        key: "trajectories",
        items: newList,
      },
    ];
    setTrajectoryList(lis);
  }, [props.trajectories]);
  return (
    <View className="teach">
      <Header />
      <View className="teach-index">
        <AtIndexes
          list={trajectoryList}
          onClick={clickListItem}
          isShowToast={false}
        />
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(PlaybackTrajectory);
