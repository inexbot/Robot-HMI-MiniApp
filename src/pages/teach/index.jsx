import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
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
    return;
  };

  render() {
    return (
      <View className="teach">
        <Header />
        <Text className="title-top">操作</Text>
        <View style="display:flex;flew-warp:warp;">
          <View
            className="teach-index1"
            onClick={this.handleClick.bind(this, "drag/index")}
          ></View>
          <View
            className="teach-index2"
            onClick={this.handleClick.bind(this, "jog/index")}
          ></View>
        </View>
      </View>
    );
  }
}

export default Teach;
