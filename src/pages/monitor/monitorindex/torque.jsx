import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class TorqueMonitor extends Component {
  config = {
    navigationBarTitleText: "监控"
  };

  render() {
    return (
      <View className="monitor">
        <Text>力矩</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(TorqueMonitor);
