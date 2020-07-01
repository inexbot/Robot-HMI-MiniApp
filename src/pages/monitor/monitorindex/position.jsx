import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";
import Header from "../../component/header"

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class PositionMonitor extends Component {
  config = {
    navigationBarTitleText: "监控"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className="monitor">
        <Text>位置</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(PositionMonitor);
