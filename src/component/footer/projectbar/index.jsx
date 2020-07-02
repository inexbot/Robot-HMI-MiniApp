import React from "react";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";

function ProjectBar(props) {
  const tabList = [
    { title: '待办事项', iconType: 'bullet-list', text: 'new' },
    { title: '拍照', iconType: 'camera' },
    { title: '文件夹', iconType: 'folder', text: '100', max: 99 }
  ]
  const handleClick = ()=>{
      return;
  }

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} />
    </View>
  );
}

export default ProjectBar;
