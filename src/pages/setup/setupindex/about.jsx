import React from "react";
import { View, Image } from "@tarojs/components";

function About () {
    return (
      <View className="about">
        <Image src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/skin/images/logo.png" lazyLoad={true} />
        <h2>创建机器人时代的轻松生活</h2>
        <p>本小程序专用于6轴协作机器人</p>
      </View>
    );
}

export default About;
