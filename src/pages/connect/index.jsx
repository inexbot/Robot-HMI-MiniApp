import React, { useState, useEffect } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ConnectState from "./connectstate";

function Connect() {
  const [ip, setIP] = useState("");
  const [port, setPort] = useState("");
  useEffect(() => {
    let routerIp = getCurrentInstance().router.params.ip;
    let routerPort = getCurrentInstance().router.params.port;
    console.log(routerIp, routerPort);
    setIP(routerIp);
    setPort(routerPort);
  }, []);

  return (
    ip !== "" && (
      <View className="index">
        <ConnectState ip={ip} port={port} />
      </View>
    )
  );
}

export default Connect;
