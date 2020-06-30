import Taro, { useEffect, useState } from "@tarojs/taro";
import { View, Button, Text, ScrollView } from "@tarojs/components";
import { AtForm, AtIndexes } from "taro-ui";
import { connect } from "@tarojs/redux";

const mapStateToProps = state => {
  return {
    projectList: state.project
  };
};
function ProjectIndex(props) {
  const [list, setList] = useState([
    {
      title: "无工程",
      key: "no",
      items: [
        {
          name: "无程序"
          // 此处可加其他业务字段
        }
      ]
    }
  ]);
  const onClick = value => {
    console.log(value);
  };
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
          name: ppl[ix].name
        });
      }
      innerObject = {
        title: pl[i].name,
        key: pl[i].name,
        items: innerList
      };
      newList.push(innerObject);
    }
    setList(newList);
    return;
  }, [props.projectList]);
  return (
    <ScrollView className="program-index">
      <AtIndexes list={list} onClick={onClick.bind(this)} isVibrate={false}>
        <View>工程列表</View>
      </AtIndexes>
    </ScrollView>
  );
}

export default connect(mapStateToProps)(ProjectIndex);
