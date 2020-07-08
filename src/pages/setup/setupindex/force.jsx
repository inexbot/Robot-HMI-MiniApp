import React, { Component } from "react";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../component/header";
import { connect } from "react-redux";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    hh: state.robotStatus.pos,
  };
};
class ForcePara extends Component {
  config = {
    navigationBarTitleText: "力学参数",
  };

  render() {
    return (
      <View className="setup">
        <Header />
        <View className="setup-index">
          <Text>力学参数正在开发中</Text>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ForcePara);
