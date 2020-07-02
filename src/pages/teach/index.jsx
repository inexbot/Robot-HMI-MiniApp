import React, { Component } from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../component/header";
import { connect } from "react-redux";
import { TeachBar } from "../../component/footer";
import "./index.less";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class Teach extends Component {
  config = {
    navigationBarTitleText: "示教"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  handleClick = value => {
    let URL = "/pages/teach/teachindex/" + value;
    Taro.navigateTo({
      url: URL
    });
    return;
  }

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

export default connect(mapStateToProps)(Teach);
