import React, { Component } from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../component/header"
import "./index.less"

class Monitor extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }
handleClick = (value)=>{
  let URL = "/pages/monitor/monitorindex/"+value
  Taro.navigateTo({
    url:URL
  });
  return;
}
  render() {
    return (
      <View className="monitor">
        <Header />
        <View className="monitor-buttons">
        <AtButton type="secondary" onClick={this.handleClick.bind(this,"io")} className="monitor-buttons-single">IO</AtButton>
        <AtButton type="secondary" onClick={this.handleClick.bind(this,"position")} className="monitor-buttons-single">位置</AtButton>
        <AtButton type="secondary" onClick={this.handleClick.bind(this,"torque")} className="monitor-buttons-single">力矩</AtButton>
        </View>
      </View>
    );
  }
}

export default Monitor;
