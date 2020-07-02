import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../component/header";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class ConnectPara extends Component {
  config = {
    navigationBarTitleText: "连接设置"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="setup">
        <Header />
        <View className="setup-index"></View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ConnectPara);
