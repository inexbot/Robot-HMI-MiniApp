import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Header from "../../component/header/index";
import "./index.module.less";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="teach">
        <Header />
        <View
          onClick={() => {
            Taro.navigateTo({ url: "jog/index" });
          }}
          className="goJog"
        >
          <Text>点动示教</Text>
        </View>
      </View>
    );
  }
}
