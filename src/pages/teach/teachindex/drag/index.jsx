import Taro, { Component, setTabBarItem, hideTabBar } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../../component/header"
import {TeachBar } from "../../../../component/footer"
import "./index.less"
import { EmergencyStopButton } from "../../../../component/buttons";

class DragIndex extends Component {
  config = {
    navigationBarTitleText: "拖拽"
  };
  handleStartDrag = () =>{
    console.log("开始拖拽")
    Taro.navigateTo({
      url:"/pages/teach/teachindex/drag/dragprocess/draging"
    })
  }
  handlePlayback = () =>{
    Taro.navigateTo({
      url:"/pages/teach/teachindex/drag/playback/index"
    })
  }

  render() {
    return (
      <View className="teach">
        <Header />
        <View className="teach-index">
          <AtButton type="primary" className="teach-index-button" onClick={this.handleStartDrag}>开始拖拽</AtButton>
          <AtButton type="secondary" className="teach-index-button" onClick={this.handlePlayback}>轨迹回放</AtButton>
        </View>
        <View className="emergency">
            <EmergencyStopButton />
        </View>
        <TeachBar />
      </View>
    );
  }
}

export default DragIndex;
