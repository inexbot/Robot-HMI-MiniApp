import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../../component/header";
import { connect } from "@tarojs/redux";

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class CartesianPara extends Component {
  config = {
    navigationBarTitleText: "笛卡尔参数"
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

export default connect(mapStateToProps)(CartesianPara);
