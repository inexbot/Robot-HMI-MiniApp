import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Header from "../../component/header";
import "./index.less";

class Monitor extends Component {
  handleClick = (value) => {
    let URL = "/pages/monitor/monitorindex/" + value;
    Taro.navigateTo({
      url: URL,
    });
    return;
  };
  render() {
    return (
      <View className="monitor">
        <Header />
        {/* <Text className="title-top">操作</Text> */}
        <View className="monitor-buttons">
          <AtButton
            type="secondary"
            onClick={this.handleClick.bind(this, "io")}
            className="monitor-buttons-single"
          >
            IO
          </AtButton>
          <AtButton
            type="secondary"
            onClick={this.handleClick.bind(this, "position")}
            className="monitor-buttons-single"
          >
            位置
          </AtButton>
          <AtButton
            type="secondary"
            onClick={this.handleClick.bind(this, "torque")}
            className="monitor-buttons-single"
          >
            力矩
          </AtButton>
        </View>
      </View>
    );
  }
}

export default Monitor;
