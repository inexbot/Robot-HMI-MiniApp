import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Header from "../../component/header";
import "./index.less";

class SetUp extends Component {
  handleClick = (value) => {
    let URL = "/pages/setup/setupindex/" + value;
    Taro.navigateTo({
      url: URL,
    });
  };

  render() {
    return (
      <View className="setup">
        <Header />
        <View className="setup-index" style="margin-top:10vh">
          <AtList className="at-list">
            <AtListItem title="机器人参数" className="setup-index-list-title" />
            <AtListItem
              title="安全参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "safe")}
            />
            <AtListItem
              title="力学参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "force")}
            />
          </AtList>
          <AtList className="at-list">
            <AtListItem title="系统" className="setup-index-list-title" />
            <AtListItem
              title="连接设置"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "connect")}
            />
          </AtList>
          <AtList className="at-list">
            <AtListItem
              title="关于"
              className="setup-index-list-title"
              arrow="right"
              onClick={this.handleClick.bind(this, "about")}
            />
          </AtList>
        </View>
      </View>
    );
  }
}

export default SetUp;
