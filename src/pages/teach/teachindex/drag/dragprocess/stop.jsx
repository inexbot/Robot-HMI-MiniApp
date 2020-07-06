import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput, AtSlider } from "taro-ui";
import Header from "../../../../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../../../../component/footer";
import { EmergencyStopButton } from "../../../../../component/buttons";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
function StopDrag(props) {
  const [speed, setSpeed] = useState(5);
  const changeSpeed = val => {
    setSpeed(val);
  };
  let backPointInterval;
  let backTrajectoryInterval;
  const backPoint = ()=>{
    backPointInterval = setInterval(() => {
      console.log("回到起点")
    }, 1000);
    return;
  }
  const stopBackPoint = () =>{
    console.log("停止回到起点")
    clearInterval(backPointInterval);
  }
  const backTrajectory = ()=>{
    backTrajectoryInterval = setInterval(()=>{
      console.log("回到轨迹");
    },1000)
    return;
  }
  const stopBackTrajectory = () =>{
    console.log("停止回到轨迹")
    clearInterval(backTrajectoryInterval);
  }
  const saveTrajectory = () =>{
    console.log("保存轨迹")
    Taro.navigateTo({
      url: "/pages/teach/teachindex/drag/dragprocess/save"
    });
    return
  }
  const giveupTrajectory = () =>{
    console.log("放弃轨迹");
    Taro.reLaunch({
      url: "/pages/teach/teachindex/drag/index"
    });
    return;
  }
  return (
    <View className="teach">
      <Header />
      <View className="teach-index" style="margin-top:10vh">
        <Text>速度：{speed}</Text>
        <AtSlider
          step={5}
          value={speed}
          activeColor="#4285F4"
          backgroundColor="#BDBDBD"
          blockColor="#4285F4"
          blockSize={24}
          onChange={changeSpeed}
        ></AtSlider>
        {/* <AtButton type="primary" className="teach-index-button" onLongPress={backPoint} >
        回到起点（持续按住）
        </AtButton> */}
        <Button onLongPress={backPoint} onTouchEnd={stopBackPoint}>回到起点（持续按住）</Button>
        <Button onLongPress={backTrajectory} onTouchEnd={stopBackTrajectory}>回放轨迹（持续按住）</Button>
        <AtButton type="primary" className="teach-index-button" customStyle={{background:"#55d676", color: "white",border:"1px solid #39b659"}} onClick={saveTrajectory}>
          保存轨迹
        </AtButton>
        <AtButton
          type="secondary"
          className="teach-index-button"
          customStyle={{ background: "#fff",color:"#ff463d",border:"1px solid #ff463d"}}
          onClick={giveupTrajectory}
        >
          放弃轨迹
        </AtButton>
      </View>
      <View className="emergency">
        <EmergencyStopButton />
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(StopDrag);
