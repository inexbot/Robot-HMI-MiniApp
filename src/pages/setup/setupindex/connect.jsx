import React, { Component } from "react";
import { View } from "@tarojs/components";
import Header from "../../../component/header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    hh: state.robotStatus.pos,
  };
};
class ConnectPara extends Component {
  config = {
    navigationBarTitleText: "连接设置",
  };

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
