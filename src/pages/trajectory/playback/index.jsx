import React, { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import { getCurrentInstance } from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { EmergencyStopButton } from "../../../component/buttons";
import { sendMSGtoController } from "../../../service/network";

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
  }
  return (
    <View>
      <Text>{trajName}</Text>
      <AtButton onClick={handleClickPlayback}>回放</AtButton>
      <AtButton onClick={handleDeleteTraj}>删除轨迹</AtButton>
      <EmergencyStopButton />
    </View>
  );
}

export default PlaybackT;
