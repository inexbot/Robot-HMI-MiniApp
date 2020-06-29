import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import ConnectState from "./connectstate"

class Connect extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentDidMount(){

  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onSubmit() {
    return;
  }
  render() {
    return (
      <View className="index">
        <ConnectState />
      </View>
    );
  }
}

export default Connect;
