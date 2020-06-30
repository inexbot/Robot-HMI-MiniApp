import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text,Navigator } from "@tarojs/components";
import { AtForm, AtButton, AtInput, AtIcon } from "taro-ui";
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
    navigationBarTitleText: "开始"
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
        <Navigator url="/pages/teach/index" openType="reLaunch">示教</Navigator>
        <AtForm onSubmit={this.onSubmit.bind(this)} className="index-index">
          <AtInput name="IP" title="IP" placeholder="例:192.168.1.11" onChange={this.onChange.bind(this)} className="index-index-input"></AtInput>
          <AtButton type="primary" formType="submit" className="index-index-button">
            连接
          </AtButton>
          <Text>最近连接</Text>
          <AtButton type="secondary">192.168.1.1</AtButton>
          <AtButton type="secondary">192.168.1.2</AtButton>
          <AtButton type="secondary">192.168.1.3</AtButton>
          <AtButton type="secondary">192.168.1.4</AtButton>
          <AtButton type="secondary">192.168.1.5</AtButton>
        </AtForm>
      </View>
    );
  }
}

export default connect(mapStateToProps)(Index);
