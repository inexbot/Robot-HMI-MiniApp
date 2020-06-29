import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "@tarojs/redux";

import "./index.less";
const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onSubmit() {
    Taro.navigateTo({
      url:'/pages/connect/index'
    })
    return;
  }
  render() {
    return (
      <View className="index">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput name="IP" title="IP" placeholder="例:192.168.1.11"></AtInput>
          <AtButton type="primary" formType="submit">
            连接
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Index);
