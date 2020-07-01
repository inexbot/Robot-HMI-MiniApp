import Taro, { Component, setTabBarItem, hideTabBar } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../../../component/header";
import { connect } from "@tarojs/redux";
import { TeachBar } from "../../../../../component/footer";
import { EmergencyStopButton } from "../../../../../component/buttons";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
function PlaybackTrajectory(props) {

  return (
    <View className="teach">
      <Header />
      <View className="teach-index">
    <Text>轨迹回放，正在开发哈哈哈</Text>
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(PlaybackTrajectory);
