import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import { AtIndexes, AtFab } from "taro-ui";
import { sendMSGtoServer } from "../../../service/network";
import { connect } from "react-redux";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    projectList: state.project.project,
  };
};
function ProjectIndex(props) {
  let selectedProgram;
  let selectedProject;
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
  useEffect(() => {
    sendMSGtoServer("Project", { robot: 1 });
  }, []);

  const openMenu = () => {
    setFabButton(menuButton);
  };
  function onClick(value){
    selectedProgram = value.name;
    selectedProject = value.projectName;
    setFabButton(singleButton);
  }

  const openProgram = () => {
    console.log(selectedProgram);
    const openprogram = {
      robot: 1,
      project: selectedProject,
      jobname: selectedProgram,
    };
    sendMSGtoServer("openProgram", openprogram);
    setFabButton(newPButton);
    Taro.navigateTo({
      url: "/pages/program/program/index",
    });
  };
  const newProgram = () => {
    console.log("新建程序");
  };
  const newPButton = <AtFab onClick={newProgram}>新建</AtFab>;
  const [fabButton, setFabButton] = useState(newPButton);
  const deleteProgram = () => {
    setFabButton(newPButton);
  };
  const singleButton = (
    <View className="projectMenu">
      <AtFab onClick={openProgram}>打开</AtFab>
      <AtFab onClick={newProgram}>新建</AtFab>
      <AtFab onClick={openMenu}>
        <Text className="at-fab__icon at-icon at-icon-menu"></Text>
      </AtFab>
    </View>
  );
  const backToSingle = () => {
    setFabButton(singleButton);
  };
  const menuButton = (
    <View className="projectMenu">
      <AtFab onClick={backToSingle}>
        <Text className="at-fab__icon at-icon at-icon-chevron-left"></Text>
      </AtFab>
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
          projectName: pl[i].name,
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
        onClick={onClick}
        isVibrate={false}
        customStyle="margin-top:10vh;height: 80vh;">
        <View style="margin-left:5vw;margin-bottom:1vh">工程列表</View>
      </AtIndexes>
      <View className="projectFabButton">{fabButton}</View>
    </ScrollView>
  );
}

export default connect(mapStateToProps)(ProjectIndex);
