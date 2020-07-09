import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro"
import { View, ScrollView, Text } from "@tarojs/components";
import { AtIndexes, AtFab } from "taro-ui";
import { connect } from "react-redux";
import "./index.less"

const mapStateToProps = (state) => {
  return {
    projectList: state.project,
  };
};
function ProjectIndex(props) {
  const [list, setList] = useState([
    {
      title: "无工程",
      key: "no",
      items: [
        {
          name: "无程序",
          // 此处可加其他业务字段
        },
      ],
    },
  ]);
  const openMenu = () => {
    setFabButton(menuButton)
  }
  const onClick = (value) => {
    console.log(value);
    setFabButton(singleButton)
  };
  const openProgram = () => {
    setFabButton();
    Taro.navigateTo({
      url:"/pages/program/program/index"
    })
  }
  const deleteProgram = () => {
    setFabButton()
  }
  const [fabButton, setFabButton] = useState();
  const singleButton = (
    <AtFab onClick={openMenu}>
      <Text className="at-fab__icon at-icon at-icon-menu"></Text>
    </AtFab>
  );
  const menuButton = (
    <View className="projectMenu">
      <AtFab onClick={openProgram}>打开</AtFab>
      <AtFab onClick={deleteProgram}>删除</AtFab>
    </View>
  );
  useEffect(() => {
    let newList = [];
    let pl = props.projectList;
    let plLength = pl.length;
    for (let i = 0; i < plLength; i++) {
      let innerObject;
      let innerList = [];
      let ppl = pl[i].program;
      let pll = ppl.length;
      for (let ix = 0; ix < pll; ix++) {
        innerList.push({
          name: ppl[ix].name,
        });
      }
      innerObject = {
        title: pl[i].name,
        key: pl[i].name,
        items: innerList,
      };
      newList.push(innerObject);
    }
    setList(newList);
    return;
  }, [props.projectList]);
  return (
    <ScrollView className="program-index">
      <AtIndexes
        list={list}
        onClick={onClick.bind(this)}
        isVibrate={false}
        customStyle="margin-top:10vh"
      >
        <View style="margin-left:5vw;margin-bottom:1vh">工程列表</View>
      </AtIndexes>
      <View className="projectFabButton">{fabButton}</View>
    </ScrollView>
  );
}

export default connect(mapStateToProps)(ProjectIndex);
