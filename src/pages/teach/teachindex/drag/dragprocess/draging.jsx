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
function Draging(props) {
  const handlePauseButton = () => {
    console.log("暂停拖拽");
    Taro.redirectTo({
      url: "/pages/teach/teachindex/drag/dragprocess/pause"
    });
  };
  return (
    <View className="teach">
      <Header />
      <View className="teach-index">
        <AtButton
          type="primary"
          className="teach-index-button"
          customStyle={{ background: "#555555", color: "white" }}
          onClick={handlePauseButton}
        >
          暂停拖拽
        </AtButton>
      </View>
      <View className="emergency">
        <EmergencyStopButton />
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(Draging);
