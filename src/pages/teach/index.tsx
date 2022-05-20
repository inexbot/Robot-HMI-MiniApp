import { Component } from "react";
import { View, Text } from "@tarojs/components";
import Header from "../../component/header/index";
export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Header />
        <Text>Hello world!</Text>
      </View>
    );
  }
}
