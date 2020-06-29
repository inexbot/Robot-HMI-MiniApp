import Taro, { useState, useEffect } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.less"
const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};

function Header(props) {
  const [connectState, setConnectState] = useState("正在连接...");
  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const [connectStatusCircle,setConnectStatusCircle] = useState("green");
  const [servoStatusCircle,setServoStatusCircle] = useState("white");
  const [deadmanStatusCircle,setDeadmanStatusCircle] = useState("green");
  useEffect(() => {

  }, []);
  return (
    <View>
      <View className="status">
        <View className="status-con">
          <Text>连接</Text>
          <View className="circle-status" style={{background:connectStatusCircle}}></View>
        </View>
        <View className="status-con">
          <Text>伺服</Text>
          <View className="circle-status" style={{background:servoStatusCircle}}></View>
        </View>
        <View className="status-con">
          <Text>上电</Text>
          <View className="circle-status"  style={{background:deadmanStatusCircle}}></View>
        </View>
        <View className="status-con">
          <Text>速度</Text>
          <Text>30%</Text>
        </View>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(Header);
