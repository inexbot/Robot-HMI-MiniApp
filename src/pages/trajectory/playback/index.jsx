import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { getCurrentInstance } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { EmergencyStopButton } from "../../../component/buttons";
import { sendMSGtoController } from "../../../service/network";
import Header from "../../../component/header";
import "./index.module.less";

function PlaybackT(props) {
  const [trajName, setTrajName] = useState("无");
  useEffect(() => {
    let _name = getCurrentInstance().router.params.tname;
    setTrajName(_name);
    return () => {
      sendMSGtoController("DEADMAN_STATUS_SET", { deadman: 0 });
    };
  }, []);
  function handleClickPlayback() {
    sendMSGtoController("DRAG_TRAJ_PLAYBACK", {
      mode: 1,
      vel: 100,
      trajName: trajName,
    });
  }
  function handleDeleteTraj() {
    sendMSGtoController("DRAG_TRAJ_DELETE", { TrajName: trajName });
    sendMSGtoController("DRAG_TRAJ_INQUIRE", "");
    Taro.navigateBack({
      url: `/pages/trajectory/playback`,
    });
  }
  return (
    <View>
      <Header />
      <View className="playback_content" >
        <Text className="playback_content_txt">{trajName}</Text>
        <AtButton className="playback_content_playback" onClick={handleClickPlayback}>回放</AtButton>
        <AtButton className="playback_content_playback" onClick={handleDeleteTraj}>删除轨迹</AtButton>
        <EmergencyStopButton className="playback_content_playback" />
      </View>
    </View>
  );
}

export default PlaybackT;
