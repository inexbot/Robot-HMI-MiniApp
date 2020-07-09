import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import Header from "../../../component/header";
import { AtIndexes, AtFab, AtList, AtCurtain, AtButton } from "taro-ui";
import { connect } from "react-redux";
import { ProgramBar } from "../../../component/footer";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    programName: state.program.name,
    instruct: state.program.instruct,
    success: state.program.success,
  };
};

function Program(props) {
  const [selectedIns, setSelectedIns] = useState();
  const [selectedNum, setSelectedNum] = useState();
  const [instructOpened, setInstructOpened] = useState(false);
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
  const clickListItem = (value) => {
    console.log(value);
    setFabButton(singleButton);
  };
  useEffect(() => {
    let success = props.success;
    if (success === false) {
      return;
    } else {
      let instruct = props.instruct;
      let newList = [];
      let num = 1;
      instruct.forEach((value, index, array) => {
        if (index === 0) {
          console.log("开始");
        } else {
          let name = value.name;
          newList.push({
            name: name,
            num: num,
          });
          num++;
        }
      });
      let lis = [
        {
          title: "指令",
          key: "instruct",
          items: newList,
        },
      ];
      setInstructList(lis);
    }
  }, [props.instruct]);
  const openMenu = () => {
    setFabButton(menuButton);
  };
  const insertInstruct = () => {
    setFabButton();
    setInstructOpened(true);
  };
  const changeInstruct = () => {
    setFabButton();
  };
  const deleteInstruct = () => {
    setFabButton();
  };
  const closeInstructGroup = () => {
    setInstructOpened(false);
  };
  const [fabButton, setFabButton] = useState();
  const singleButton = (
    <AtFab onClick={openMenu}>
      <Text className="at-fab__icon at-icon at-icon-menu"></Text>
    </AtFab>
  );
  const menuButton = (
    <View className="projectMenu">
      <AtFab onClick={insertInstruct}>插入</AtFab>
      <AtFab onClick={changeInstruct}>修改</AtFab>
      <AtFab onClick={deleteInstruct}>删除</AtFab>
    </View>
  );
  return (
    <View className="program">
      <Header />
      <View className="program-index">
        <AtCurtain
          isOpened={instructOpened}
          closeBtnPosition="bottom"
          onClose={closeInstructGroup}
        >
          <View className="instructs">
            <View className="instructs-group">
              <Text>运动控制</Text>
              <View className="intructs-group-btn">
              <AtButton size="small">MOVJ</AtButton>
              <AtButton size="small">MOVL</AtButton>
              </View>
              <View className="intructs-group-btn">
              <AtButton size="small">MOVC</AtButton>
              <AtButton size="small">MOVS</AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text>输入输出</Text>
              <View className="intructs-group-btn">
              <AtButton size="small">DOUT</AtButton>
              <AtButton size="small">AOUT</AtButton>
              </View>
              <View className="intructs-group-btn">
              <AtButton size="small">DIN</AtButton>
              <AtButton size="small">AIN</AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text>变量</Text>
              <View className="intructs-group-btn">
              <AtButton size="small">SETINT</AtButton>
              <AtButton size="small">SETDOUBLE</AtButton>
              </View>
              <View className="intructs-group-btn">
              <AtButton size="small">SETBOOL</AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text>条件控制</Text>
              <View className="intructs-group-btn">
              <AtButton size="small">IF</AtButton>
              <AtButton size="small">WHILE</AtButton>
              </View>
              <View className="intructs-group-btn">
              <AtButton size="small">LABEL</AtButton>
              <AtButton size="small">JUMP</AtButton>
              </View>
            </View>
          </View>
        </AtCurtain>
        <AtIndexes
          list={instructList}
          onClick={clickListItem}
          isShowToast={false}
        />
      </View>
      <View className="program-menu">{fabButton}</View>
      <ProgramBar />
    </View>
  );
}

export default connect(mapStateToProps)(Program);
