import React from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton } from "taro-ui";
import Header from "../../../../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../../../../component/footer";
import { EmergencyStopButton } from "../../../../../component/buttons";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
function Pause() {

  const handleContinueDrag = () => {
    console.log("继续拖拽");
    Taro.redirectTo({
      url: "/pages/teach/teachindex/drag/dragprocess/draging"
    });
  };
  const handleStopDrag = () => {
    console.log("停止拖拽");
    Taro.redirectTo({
      url: "/pages/teach/teachindex/drag/dragprocess/stop"
    });
  };
  return (
    <View className="teach">
      <Header />
      <View className="teach-index">
        <AtButton
          type="primary"
          className="teach-index-button"
          onClick={handleContinueDrag}
        >
          继续拖拽
        </AtButton>
        <AtButton
          type="secondary"
          className="teach-index-button"
          customStyle={{ background: "#555555", color: "white" }}
          onClick={handleStopDrag}
        >
          停止拖拽
        </AtButton>
      </View>
      <View className="emergency">
        <EmergencyStopButton />
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(Pause);
