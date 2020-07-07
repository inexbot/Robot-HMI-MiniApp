import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View,Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import Header from "../../component/header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    hh: state.robotStatus.pos,
  };
};
class SetUp extends Component {
  handleClick = (value) => {
    let URL = "/pages/setup/setupindex/" + value;
    Taro.navigateTo({
      url: URL,
    });
  };

  render() {
    return (
      <View className="setup">
        <Header />
        <View className="setup-index" style="margin-top:10vh">
        <Text style="line-height:2;font-weight:600;margin-left:10vw">参数设置</Text>
          <AtList>
            <AtListItem title="机器人参数" className="setup-index-list-title" />
            <AtListItem
              title="DH参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "dh")}
            />
            <AtListItem
              title="关节参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "joint")}
            />
            <AtListItem
              title="安全参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "safe")}
            />
            <AtListItem
              title="力学参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "force")}
            />
            <AtListItem
              title="笛卡尔参数"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "cartesian")}
            />
            <AtListItem title="系统" className="setup-index-list-title" />
            <AtListItem
              title="连接设置"
              className="setup-index-list-item"
              arrow="right"
              onClick={this.handleClick.bind(this, "connect")}
            />
            <AtListItem
              title="关于"
              className="setup-index-list-title"
              arrow="right"
              onClick={this.handleClick.bind(this, "about")}
            />
          </AtList>
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(SetUp);
