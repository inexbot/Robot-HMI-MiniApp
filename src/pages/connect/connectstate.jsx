import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

function ConnectState(props) {
  const [connectState, setConnectState] = useState("正在连接...");
  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("none");
  useEffect(() => {
    let IP = "ws://" + props.ip + ":" + props.port;
    console.log(IP);
    Taro.connectSocket({
      url: IP,
    });
    setTimeout(() => {
      Taro.reLaunch({ url: "/pages/teach/index" });
    }, 2000);
  }, []);
  return (
    <View>
      <View>{connectState}</View>
      <View style={{ display: display1 }}>
        <Text>正在获取数据...</Text>
      </View>
      <View style={{ display: display2 }}>
        <Text>获取成功</Text>
        <Text>正在跳转</Text>
      </View>
    </View>
  );
}

export default ConnectState;
