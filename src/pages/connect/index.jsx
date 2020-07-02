import React, { Component } from 'react'
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import { connect } from "react-redux";
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
        <ConnectState ip={this.$router.params.ip}/>
      </View>
    );
  }
}

export default Connect;
