import React, { Component } from "react";
import { View } from "@tarojs/components";
import Header from "../../../component/header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    hh: state.robotStatus.pos,
  };
};
class CartesianPara extends Component {
  config = {
    navigationBarTitleText: "笛卡尔参数",
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

export default connect(mapStateToProps)(CartesianPara);
