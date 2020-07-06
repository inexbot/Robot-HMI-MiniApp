import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../../../component/header"
import { connect } from "react-redux";
import {TeachBar } from "../../../../../component/footer"
import { EmergencyStopButton } from "../../../../../component/buttons";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class SaveTrajectory extends Component {

  render() {
    return (
      <View className="teach">
        <Header />
        <View className="teach-index" style="margin-top:10vh">
          <Text>轨迹名</Text>
          {/* <AtInput /> */}
          <AtButton customStyle={{background:"#55d676", color: "white",border:"1px solid #39b659"}}>保存轨迹</AtButton>
        </View>
        <View className="emergency">
            <EmergencyStopButton />
        </View>
        <TeachBar />
      </View>
      
    );
  }
}

export default connect(mapStateToProps)(SaveTrajectory);
