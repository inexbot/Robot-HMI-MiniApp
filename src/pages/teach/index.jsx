import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtButton } from "taro-ui";
import Header from "../../component/header";
import { connect } from "react-redux";
import "./index.less";

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
        <View className="teach-index">
          <AtButton
            type="secondary"
            className="teach-index-button"
            onClick={this.handleClick.bind(this, "drag/index")}
          >
            拖拽
          </AtButton>
          <AtButton
            type="secondary"
            className="teach-index-button"
            onClick={this.handleClick.bind(this, "jog/index")}
          >
            点动
          </AtButton>
        </View>
      </View>
    );
  }
}

export default Teach;
