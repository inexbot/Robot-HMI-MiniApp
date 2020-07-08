import React from "react";
import { View, Image } from "@tarojs/components";
import "./about.less";

function About() {
  return (
    <View className="about">
      <Image
        src="https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/1LOGO.jpg"
        lazyLoad={true}
        className="logo"
      />
      <View className="about-title">创建机器人时代的轻松生活</View>
      <View className="about-content">本小程序专用于6轴协作机器人</View>
    </View>
  );
}

export default About;
