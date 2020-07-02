import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "react-redux";
import Header from "../../../component/header"

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class PositionMonitor extends Component {
  config = {
    navigationBarTitleText: "监控"
  };

  render() {
    return (
      <View className="monitor">
        <Text>位置</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(PositionMonitor);
