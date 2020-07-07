import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Header from "../../component/header";
import { connect } from "react-redux";
import "./index.less";
import { sendMSGtoController } from "../../service/network";

class Teach extends Component {
  handleClick = (value) => {
    let URL = "/pages/teach/teachindex/" + value;
    Taro.navigateTo({
      url: URL,
    });
    sendMSGtoController("SERVO_STATUS_SET",{ww:1})
    return;
  };

  render() {
    return (
      <View className="teach">
        <Header />
        <Text className="title-top">操作</Text>
        <View style="display:flex;flew-warp:warp;">
        <View className="teach-index1">
          <AtButton
            type="secondary"
            className="teach-index-button"
            onClick={this.handleClick.bind(this, "drag/index")}
          >
            拖拽
          </AtButton>
          </View>
        <View className="teach-index2">
          <AtButton
            type="secondary"
            className="teach-index-button"
            onClick={this.handleClick.bind(this, "jog/index")}
          >
            点动
          </AtButton>
        </View>
        </View>
      </View>
    );
  }
}

export default Teach;
