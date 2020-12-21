import { View } from "@tarojs/components";
import React from "react";
import { AtToast } from "taro-ui";
function WaitEnable(props) {
  return (
    <View>
      <AtToast
        isOpened={props.isOpened}
        status="loading"
        duration={0}
        text="正在等待上电完毕"
        hasMask={true}
      ></AtToast>
    </View>
  );
}
export default WaitEnable;
