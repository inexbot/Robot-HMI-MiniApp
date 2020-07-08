import React, { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { AtButton, AtInput, AtMessage, AtFloatLayout } from "taro-ui";
import "./index.less";

function Start() {
  const [ip, setIp] = useState("");
  const [queOpened, setQueOpened] = useState(false);
  const [port, setPort] = useState("8443");
  const changeIP = (IP) => {
    setIp(IP);
  };
  const changePort = (PORT) => {
    setPort(PORT);
  };
  const onSubmit = (event) => {
    let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    let reg = ip.match(exp);
    if (reg === null || ip === "") {
      Taro.atMessage({
        message: "IP地址不合法！",
        type: "error",
      });
    } else {
      Taro.navigateTo({
        url: "/pages/connect/index" + "?ip=" + ip + "&port=" + port,
      });
    }
    return;
  };
  const clickQue = () => {
    setQueOpened(true);
  };

  return (
    <View className="index">
      <AtMessage />
      <AtFloatLayout isOpened={queOpened} title="连接问题">
        您的手机需要与控制器在同一个局域网内。 IP输入控制器的IP。
        端口为服务端的端口，默认为9000。
      </AtFloatLayout>
      <View style="text-align:center;padding:30px">
        <Image
          src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/1LOGO.jpg"
          className="logo"
          alt=""
          mode="aspectFit"
        />
      </View>
      <AtInput
        name="ip"
        title="IP"
        placeholder="例:192.168.1.11"
        onChange={changeIP}
        className="index-index-input log_ip"
        value={ip}
      ></AtInput>
      <AtInput
        name="port"
        title="Port"
        placeholder="默认8443"
        onChange={changePort}
        className="index-index-input log_port"
        value={port}
      ></AtInput>
      <AtButton
        type="primary"
        className="index-index-button log_conn"
        onClick={onSubmit}
      >
        连接
      </AtButton>
      <View onClick={clickQue}>
        <text className="log_que">遇见问题</text>
      </View>
    </View>
  );
}

export default Start;
