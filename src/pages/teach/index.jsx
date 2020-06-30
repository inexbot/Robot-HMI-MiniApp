import Taro, { Component, setTabBarItem, hideTabBar } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import { AtForm, AtButton, AtInput } from "taro-ui";
import Header from "../../component/header"
import { connect } from "@tarojs/redux";
import {TeachBar } from "../../component/footer"
import "./index.less"

const mapStateToProps = state => {
  return {
    hh: state.robotStatus.pos
  };
};
class Teach extends Component {
  config = {
    navigationBarTitleText: "示教"
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
      <View className="teach">
        <Header />
        <View className="teach-index">
          <AtButton type="secondary" className="teach-index-button">拖拽</AtButton>
          <AtButton type="secondary" className="teach-index-button">点动</AtButton>
        </View>
        <TeachBar />
      </View>
      
    );
  }
}

export default connect(mapStateToProps)(Teach);
