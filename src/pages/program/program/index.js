import React, { useState, useEffect } from "react";
import { getCurrentInstance } from "@tarojs/taro";
import { View, ScrollView, Text } from "@tarojs/components";
import Header from "../../../component/header";
import { AtIndexes, AtFab, AtCurtain, AtButton } from "taro-ui";
import { connect } from "react-redux";
import { ProgramBar } from "../../../component/footer";
import "./index.less";
import Instruct from "./instruct";

const mapStateToProps = (state) => {
  return {
    programName: state.program.name,
    instruct: state.program.instruct,
    success: state.program.success,
  };
};

function Program(props) {
  const [selectedRow, setSelectedRow] = useState(1);
  const [instruct, setInstruct] = useState("");
  const [instructOpened, setInstructOpened] = useState(false);
  const [instructParaOpened, setInstructParaOpened] = useState(false);
  const [insertOrChange, setInsertOrChange] = useState("insert");
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

  let programName = getCurrentInstance().router.params.name;

  const clickListItem = (value) => {
    setSelectedRow(value.num);
    setInstruct(value.name);
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
        if (value === null) {
          console.log("开始");
        } else {
          let name = value.name;
          newList.push({
            name: name,
            num: num,
            key: num + 101,
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
  const backToSingle = () => {
    setFabButton(singleButton);
  };
  const insertInstruct = () => {
    setInsertOrChange("insert");
    setFabButton(singleButton);
    setInstructOpened(true);
  };
  const changeInstruct = () => {
    setInsertOrChange("change");
    setFabButton(singleButton);
    setInstructParaOpened(true);
  };
  const deleteInstruct = () => {
    setFabButton(singleButton);
  };
  const closeInstructGroup = () => {
    setInstructOpened(false);
  };
  const [fabButton, setFabButton] = useState(
    <View className="programMenu">
      <AtFab onClick={insertInstruct}>插入</AtFab>
    </View>
  );
  const singleButton = (
    <View className="programMenu">
      <AtFab onClick={insertInstruct}>插入</AtFab>
      <AtFab onClick={changeInstruct}>修改</AtFab>
      <AtFab onClick={openMenu}>
        <Text className="at-fab__icon at-icon at-icon-menu"></Text>
      </AtFab>
    </View>
  );
  const menuButton = (
    <View className="programMenu">
      <AtFab onClick={deleteInstruct}>删除</AtFab>
      <AtFab onClick={backToSingle}>
        <Text className="at-fab__icon at-icon at-icon-chevron-left"></Text>
      </AtFab>
    </View>
  );
  const openInstructPara = (value) => {
    setInstruct(value);
    setInstructOpened(false);
    setInstructParaOpened(true);
  };
  const closeInstructPara = () => {
    setInstructParaOpened(false);
  };

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
              <Text className="intructs-group-tit">运动控制</Text>
              <View className="intructs-group-btn">
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "MOVJ")}
                >
                  MOVJ
                </AtButton>
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "MOVL")}
                >
                  MOVL
                </AtButton>
              </View>
              <View className="intructs-group-btn">
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "MOVC")}
                >
                  MOVC
                </AtButton>
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "MOVS")}
                >
                  MOVS
                </AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text className="intructs-group-tit">输入输出</Text>
              <View className="intructs-group-btn">
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "Dout")}
                >
                  DOUT
                </AtButton>
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "Aout")}
                >
                  AOUT
                </AtButton>
              </View>
              <View className="intructs-group-btn">
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "Din")}
                >
                  DIN
                </AtButton>
                <AtButton
                  size="small"
                  onClick={openInstructPara.bind(this, "Ain")}
                >
                  AIN
                </AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text className="intructs-group-tit">变量</Text>
              <View className="intructs-group-btn">
                <AtButton size="small">SETINT</AtButton>
                <AtButton size="small">SETDOUBLE</AtButton>
              </View>
              <View className="intructs-group-btn">
                <AtButton size="small">SETBOOL</AtButton>
              </View>
            </View>
            <View className="instructs-group">
              <Text className="intructs-group-tit">条件控制</Text>
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
        <AtCurtain isOpened={instructParaOpened} onClose={closeInstructPara}>
          <Instruct
            instruct={instruct}
            row={selectedRow+1}
            insertOrChange={insertOrChange}
            closeInstruct={closeInstructPara}
          />
        </AtCurtain>
        <AtIndexes
          list={instructList}
          onClick={clickListItem}
          isShowToast={false}
        />
      </View>
      <View className="program-menu">{fabButton}</View>
      <ProgramBar name={programName} />
    </View>
  );
}

export default connect(mapStateToProps)(Program);
