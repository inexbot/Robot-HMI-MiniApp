import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro"
import { View, Button, Text, Picker } from "@tarojs/components";
import { AtForm, AtButton, AtList, AtListItem,AtSlider } from "taro-ui";
import Header from "../../../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../../../component/footer";
import { EmergencyStopButton } from "../../../../component/buttons";
import "./index.less";
import { sendMSGtoController } from "../../../../service/network";

const mapStateToProps = state => {
  return {
    coordinate: state.robotStatus.currentCoordinate,
    pos:state.robotStatus.pos
  };
};
function JogIndex(props) {
  const [coordinate, setCoordinate] = useState(0);
  const [axis,setAxis] = useState(["J1","J2","J3","J4","J5","J6"])
  const [speed,setSpeed] = useState(12)
  const [selected,setSelected] = useState("关节")
  const coordinateRange = ["关节", "直角", "工具", "用户"];
  const changeSpeed = val => {
    setSpeed(val);
  };
  useEffect(() => {
    let sendInquire;
    sendInquire = setInterval(() => {
      let data = {
        robot: 1,
        coord: props.coordinate,
      };
      sendMSGtoController("CURRENTPOS_INQUIRE", data);
    }, 500);
    return () => {
      clearInterval(sendInquire);
    };
  }, [props.coordinate]);
  let jogInterval;
  useEffect(()=>{
    let coordinate = props.coordinate
    switch (coordinate) {
      case 0:
        setSelected(coordinateRange[0]);
        setCoordinate(0);
        setAxis(["J1","J2","J3","J4","J5","J6"])
        break;
      case 1:
        setSelected(coordinateRange[1]);
        setCoordinate(1);
        setAxis(["X","Y","Z","A","B","C"])
        break;
      case 2:
        setSelected(coordinateRange[2]);
        setCoordinate(2);
        setAxis(["TX","TY","TZ","TA","TB","TC"])
        break;
      case 3:
        setSelected(coordinateRange[3]);
        setCoordinate(3);
        setAxis(["UX","UY","UZ","UA","UB","UC"])
        break;
      default:
        break;
    }
  },[props.coordinate])
  useEffect(()=>{
    console.log(props.pos)
  },[props.pos])
  const changeCoordinate = val => {
    let value = val.currentTarget.value;
    switch (value) {
      case "0":
        let jointData = {
          robot: 1,
          coord: 0
        };
        sendMSGtoController("COORD_MODE_SET", jointData);
        break;
      case "1":
        let xyzData = {
          robot: 1,
          coord: 1
        };
        sendMSGtoController("COORD_MODE_SET", xyzData);
        break;
      case "2":
        let toolData = {
          robot: 1,
          coord: 2
        };
        sendMSGtoController("COORD_MODE_SET", toolData);
        break;
      case "3":
        let userData = {
          robot: 1,
          coord: 3
        };
        sendMSGtoController("COORD_MODE_SET", userData);
        break;
      default:
        break;
    }
  };
  const startJog = (axis,direction) => {
    let jogData = {
      axis: axis,
      direction: direction,
    };
    jogInterval = setInterval(() => {
      console.log(`正在点动${axis}轴的${direction}方向`);
      sendMSGtoController("JOG_OPERATION_MOVE", jogData)
    }, 300);
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
          value={coordinate}
        >
          <AtList style="padding:5vw;font-weight:600">
            <AtListItem extraText={selected}/>
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
