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
        >
          <AtList style="padding:5vw;font-weight:600">
            <AtListItem title="切换坐标系" extraText={coordinate} />
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
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,1,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[0]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,1,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
          </View>
          <View className="jog-index-buttons-single">
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,2,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[1]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,2,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
          </View>
          <View className="jog-index-buttons-single">
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,3,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[2]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,3,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
          </View>
          <View className="jog-index-buttons-single">
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,4,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[3]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,4,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
          </View>
          <View className="jog-index-buttons-single">
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,5,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[4]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,5,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
          </View>
          <View className="jog-index-buttons-single">
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,6,-1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>-</Button>
            <Text>{axis[5]}</Text>
            <Button className="jog-index-buttons-single-button" onLongPress={startJog.bind(this,6,1)} onTouchCancel={stopJog} onTouchEnd={stopJog}>+</Button>
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
