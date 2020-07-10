import React, { useState, useEffect } from "react";
import { sendMSGtoServer } from "../../../service/network";
import { AtInput, AtButton, AtList, AtListItem } from "taro-ui";
import "./index.less";
import { View, Text, Picker } from "@tarojs/components";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    instruct: state.program.instruct,
    var: state.program.var,
    currentPos: state.robotStatus.pos,
  };
};

function Movj(props) {
  const [pRange, setPRange] = useState([]);
  const [POSNum, setPOSNum] = useState();
  const [POS, setPOS] = useState();
  const [VJ, setVJ] = useState();
  const [PL, setPL] = useState();
  const [ACC, setACC] = useState();
  const [DEC, setDEC] = useState();

  function newPos(sum) {
    let pS = sum.length + 1;
    let posName;
    if (pS < 10) {
      posName = `P00${pS}`;
    } else if (pS >= 10 && pS < 100) {
      posName = `P0${pS}`;
    } else if (pS > 100) {
      posName = `P${pS}`;
    }
    return posName;
  }

  useEffect(() => {
    let newRange = [];
    newRange.push("新建");
    if (props.var === undefined || props.var === null) {
      console.log("无变量");
    } else if (
      props.var.position === undefined ||
      props.var.position === null
    ) {
      console.log("无点位");
    } else {
      let num = 1;
      let plength = props.var.position.length;
      for (let i = 0; i < plength; i++) {
        if (num < 10) {
          newRange.push(`P00${num}`);
        } else if (num < 100) {
          newRange.push(`P0${num}`);
        } else {
          newRange.push(`P${num}`);
        }
        num++;
      }
    }
    setPRange(newRange);
  }, [props.var]);
  useEffect(() => {
    let insertOrChange = props.insertOrChange;
    let value;
    if (insertOrChange === "insert") {
      value = {
        POSNum: 0,
        POS: "新建",
        VJ: 10,
        PL: 3,
        ACC: 10,
        DEC: 10,
      };
    } else {
      let row = props.row;
      let para = props.instruct[row].para;
      let posnum = indexOf(pRange, para.POS);
      value = {
        POSNum: posnum,
        POS: para.POS,
        VJ: para.VJ,
        PL: para.PL,
        ACC: para.ACC,
        DEC: para.DEC,
      };
    }
    setPOSNum(value.POSNum);
    setPOS(value.POS);
    setVJ(value.VJ);
    setPL(value.PL);
    setACC(value.ACC);
    setDEC(value.DEC);
  }, []);
  const changePos = (value) => {
    let val = value.detail.value;
    let num = parseInt(val);
    setPOSNum(num);
    setPOS(pRange[num]);
  };
  const changeVJ = (value) => {
    setVJ(value);
  };
  const changePL = (value) => {
    setPL(value);
  };
  const changeACC = (value) => {
    setACC(value);
  };
  const changeDEC = (value) => {
    setDEC(value);
  };
  const clickFinish = () => {
    let pos;
    let posType;
    let posName;
    if (POS === "新建") {
      pos = props.currentPos;
      posType = 0;
      let posSum = pRange.length - 1;
      posName = newPos(posSum);
    } else {
      pos = POS;
      posType = 1;
      posName = null;
    }
    if (props.insertOrChange === "change") {
      let sendData = {
        line: parseInt(props.row),
        modifystate: 1,
        name: "MOVJ",
        postype: posType,
        posname: posName,
        POS: pos,
        VJ: parseFloat(VJ),
        ACC: parseFloat(ACC),
        DEC: parseFloat(DEC),
        PL: parseInt(PL),
      };
      sendMSGtoServer("INSERT_COMMAND", sendData);
    } else {
      let sendInsert = {
        line: parseInt(props.row + 1),
        modifystate: 0,
        name: "MOVJ",
        postype: posType,
        posname: posName,
        POS: pos,
        VJ: parseFloat(VJ),
        ACC: parseFloat(ACC),
        DEC: parseFloat(DEC),
        PL: parseInt(PL),
      };
      sendMSGtoServer("INSERT_COMMAND", sendInsert);
    }
    props.closeInstruct(false);
  };
  return (
    <View>
      <Text>MOVJ</Text>
      <Picker
        mode="selector"
        range={pRange}
        value={POSNum}
        onChange={changePos}
      >
        <AtList>
          <AtListItem title="位置" extraText={POS} />
        </AtList>
      </Picker>
      <AtInput title="VJ" name="VJ" value={VJ} onChange={changeVJ} />
      <AtInput title="PL" name="PL" value={PL} onChange={changePL} />
      <AtInput title="ACC" name="ACC" value={ACC} onChange={changeACC} />
      <AtInput title="DEC" name="DEC" value={DEC} onChange={changeDEC} />
      <AtButton onClick={clickFinish}>确定</AtButton>
    </View>
  );
}
export default connect(mapStateToProps)(Movj);
