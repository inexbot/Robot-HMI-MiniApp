import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Header from "../../../component/header";
import { AtIndexes, AtFab, AtList, AtCurtain, AtButton } from "taro-ui";
import { connect } from "react-redux";
import { RunningBar } from "../../../component/footer";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    programName: state.program.name,
    instruct: state.program.instruct,
  };
};

function Running(props) {
  const [instructList, setInstructList] = useState([
    {
      title: "指令",
      key: "no",
      items: [
        {
          name: "无指令",
          // 此处可加其他业务字段
        },
      ],
    },
  ]);
  useEffect(() => {
    let instruct = props.instruct;
    let newList = [];
    let num = 1;
    instruct.forEach((value, index, array) => {
      let name = value.name;
      newList.push({
        name: name,
        num: num,
      });
      num++;
    });
    let lis = [
      {
        title: "轨迹",
        key: "instruct",
        items: newList,
      },
    ];
    setInstructList(lis);
  }, [props.instruct]);

  return (
    <View className="running">
      <Header />
      <View className="running-index">
        <AtIndexes list={instructList} isShowToast={false} />
      </View>
      <RunningBar />
    </View>
  );
}

export default connect(mapStateToProps)(Running);
