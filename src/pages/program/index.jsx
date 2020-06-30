import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import ProjectIndex from "./project"
import Header from "../../component/header"
import "./index.less"

class Program extends Component {
  config = {
    navigationBarTitleText: "程序"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {

  }

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Header />
        <ProjectIndex />
      </View>
    );
  }
}

export default Program
