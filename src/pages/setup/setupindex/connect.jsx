import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import Header from "../../../component/header";
import { connect } from "react-redux";
import "./index.less";
import { AtList, AtListItem, AtButton } from "taro-ui";

const mapStateToProps = (state) => {
  return {
    controllerID: state.controllerConfig.controllerID,
    connectIP: state.controllerConfig.connectIP,
    connectPort: state.controllerConfig.connectPort,
  };
};
function ConnectPara(props) {
  const [controllerID, setControllerID] = useState("noID");
  const [connectIP, setConnectIP] = useState("3.3.3.3");
  const [connectPort, setConnectPort] = useState("0000");
  useEffect(() => {
    setControllerID(props.controllerID);
    setConnectIP(props.connectIP);
    setConnectPort(props.connectPort);
  }, []);
  const closeSocket = () => {
    Taro.closeSocket();
    Taro.reLaunch({
      url: "/pages/index/index",
    });
  };
  return (
    <View className="setup">
      <Header />
      <Text className="title_top1">连接设置</Text>
      <View className="setup-index">
        <AtList>
          <AtListItem title="ID" extraText={controllerID} />
          <AtListItem title="IP" extraText={connectIP} />
          <AtListItem title="端口" extraText={connectPort} />
        </AtList>
        <AtButton onClick={closeSocket} className="reconnect">退出重连</AtButton>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(ConnectPara);
