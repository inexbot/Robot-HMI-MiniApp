import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro"
import { View, Button, Text, Picker } from "@tarojs/components";
import { AtForm, AtButton, AtList, AtListItem,AtSlider } from "taro-ui";
import Header from "../../../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../../../component/footer";
import { EmergencyStopButton } from "../../../../component/buttons";
import "./index.less";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
function JogIndex() {
  const [coordinate, setCoordinate] = useState("关节");
  const [axis,setAxis] = useState(["J1","J2","J3","J4","J5","J6"])
  const [speed,setSpeed] = useState(12)
  const coordinateRange = ["关节", "直角", "工具", "用户"];
  const changeSpeed = val => {
    setSpeed(val);
  };
  let jogInterval;
  const changeCoordinate = val => {
    let value = val.currentTarget.value;
    switch (value) {
      case "0":
        setCoordinate("关节");
        break;
      case "1":
        setCoordinate("直角");
        break;
      case "2":
        setCoordinate("工具");
        break;
      case "3":
        setCoordinate("用户");
        break;
      default:
        break;
    }
  };
  const startJog = (value,direction) => {
    jogInterval = setInterval(() => {
      console.log(`正在点动${value}轴的${direction}方向`);
    }, 1000);
    return;
  };
  const stopJog = () => {
    console.log("停止点动")
    clearInterval(jogInterval);
  };
  return (
    <View className="jog">
      <Header />
      <View className="jog-index" style="margin-top:10vh">
      {/* <Image src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/exchange.png" customStyle="width:64px;height:64px" alt="" mode='aspectFit' /> */}
        <Picker
          mode="selector"
          range={coordinateRange}
          onChange={changeCoordinate}
          style="box-shadow: 0 12rpx 24rpx rgba(96, 146, 229, 0.2);
          margin: 24px 0;
          border-radius: 12px;"
        >
          <Text style="background:rgba(255,255,255,0);line-height:40px;margin-left:5vw;">切换坐标系</Text>
          <AtList style="padding:5vw;font-weight:600">
            <AtListItem extraText={coordinate}/>
          </AtList>
        </Picker>
        <View style="margin: 24px 5vw">
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
        </View>
        <View className="jog-index-buttons">
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,1,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[0]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,1,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,2,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[1]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,2,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,3,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[2]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,3,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,4,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[3]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,4,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,5,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[4]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,5,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
          <View className="jog-index-buttons-single">
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,6,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</View>
            <Text className="jog-index-text">{axis[5]}</Text>
            <View className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,6,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</View>
          </View>
        </View>
      </View>
      <View className="emergency">
        <EmergencyStopButton />
      </View>
      <View style="height:40px">
      </View>
      <TeachBar />
    </View>
  );
}

export default connect(mapStateToProps)(JogIndex);
