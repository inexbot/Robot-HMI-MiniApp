import React from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components";
import {  AtButton } from "taro-ui";
import Header from "../../../../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../../../../component/footer";
import { EmergencyStopButton } from "../../../../../component/buttons";
import "../index.less"

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
        <View className="teach-circle">
        <AtButton
          type="primary"
          className="teach-index-button"
          customStyle={{ background: "#fff",color:"#ff463d",border:"1px solid #ff463d", width:"180px",height:"180px",borderRadius:90,fontSize:"18px",padding:70}}
          onClick={handlePauseButton}
        >
          暂停拖拽
        </AtButton>
        </View>

      </View>
      <View className="emergency">
        <EmergencyStopButton/>
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(Draging);
