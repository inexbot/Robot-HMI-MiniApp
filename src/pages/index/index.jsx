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
  constructor(props){
    super(props);
    state:{
      ip:'192.168.0.0'
    }
  }
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  onChange(value){
    this.setState({
      ip:value
    })
  }
  onSubmit(event) {
    Taro.navigateTo({
      url:'/pages/connect/index'+'?ip='+this.state.ip
    })
    return;
  }
  render() {
    return (
      <View className="index">
        <AtForm onSubmit={this.onSubmit.bind(this)}>
          <AtInput name="IP" title="IP" placeholder="例:192.168.1.11" onChange={this.onChange.bind(this)}></AtInput>
          <AtButton type="primary" formType="submit">
            连接
          </AtButton>
        </AtForm>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Index);
