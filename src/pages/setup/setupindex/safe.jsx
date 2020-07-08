import React, { useState, useEffect } from "react";
import { View, Button, Text, Picker } from "@tarojs/components";
import {
  AtForm,
  AtButton,
  AtInput,
  AtList,
  AtListItem,
  AtSwitch,
} from "taro-ui";
import Header from "../../../component/header";
import { connect } from "react-redux";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    dinStatus: state.IOParameter.dinStatus,
    doutStatus: state.IOParameter.doutStatus,
  };
};
function SafePara(props) {
  const [firUse, setFirUse] = useState(false);
  const [secUse, setSecUse] = useState(false);
  const [dinRange, setDinRange] = useState([]);
  const [doutRange, setDoutRange] = useState([]);

  const [firDinSelected, setFirDinSelected] = useState("DIN1-2");
  const [firDinSeletedNum, setFirDinSelectedNum] = useState(1);
  const [firDoutSelected, setFirDoutSelected] = useState("DOUT1-2");
  const [firDoutSeletedNum, setFirDoutSelectedNum] = useState(1);

  const [secDinSelected, setSecDinSelected] = useState("DIN1-2");
  const [secDinSeletedNum, setSecDinSelectedNum] = useState(1);
  const [secDoutSelected, setSecDoutSelected] = useState("DOUT1-2");
  const [secDoutSeletedNum, setSecDoutSelectedNum] = useState(1);

  useEffect(() => {
    let din = props.dinStatus;
    if (din !== undefined || din !== null) {
      let len = din.length;
      if (len <= 16) {
        let newDinArrayLessThan16 = [];
        for (let i = 0; i < len; i++) {
          newDinArrayLessThan16.push(`DIN1-${i + 1}`);
        }
        setDinRange(newDinArrayLessThan16);
      } else {
        let newDinArrayMoreThan16 = [];
        for (let i = 0; i < 16; i++) {
          newDinArrayMoreThan16.push(`DIN1-${i + 1}`);
        }
        for (let i = 16; i < len; i++) {
          newDinArrayMoreThan16.push(`DIN2-${i + 1}`);
        }
        setDinRange(newDinArrayMoreThan16);
      }
    }
  }, [props.dinStatus]);

  useEffect(() => {
    let dout = props.doutStatus;
    if (dout !== undefined || dout !== null) {
      let len = dout.length;
      if (len <= 16) {
        let newDoutArrayLessThan16 = [];
        for (let i = 0; i < len; i++) {
          newDoutArrayLessThan16.push(`DOUT1-${i + 1}`);
        }
        setDoutRange(newDoutArrayLessThan16);
      } else {
        let newDoutArrayMoreThan16 = [];
        for (let i = 0; i < 16; i++) {
          newDoutArrayMoreThan16.push(`DOUT1-${i + 1}`);
        }
        for (let i = 16; i < len; i++) {
          newDoutArrayMoreThan16.push(`DOUT2-${i + 1}`);
        }
        setDoutRange(newDoutArrayMoreThan16);
      }
    }
  }, [props.doutStatus]);

  return (
    <View className="setup">
      <Header />
      <View className="setup-index">
        <AtForm>
          <Text id="setup-h1">第一级减速设置</Text>
          <AtSwitch title="开启" checked={firUse} />
          <Picker mode="selector" range={dinRange} value={firDinSeletedNum}>
            <AtList>
              <AtListItem title="输入DIN" extraText={firDinSelected} />
            </AtList>
          </Picker>
          <Picker mode="selector" range={doutRange} value={firDoutSeletedNum}>
            <AtList>
              <AtListItem title="生效输出DOUT" extraText={firDoutSelected} />
            </AtList>
          </Picker>
          <AtInput name="firstMaxSpeed" title="空间最大速度" confirmType="保存">
            mm/s
          </AtInput>
        </AtForm>
        <AtForm>
          <Text id="setup-h1">第二级减速设置</Text>
          <AtSwitch title="开启" checked={secUse} />
          <Picker mode="selector" range={dinRange} value={secDinSeletedNum}>
            <AtList>
              <AtListItem title="输入DIN" extraText={secDinSelected} />
            </AtList>
          </Picker>
          <Picker mode="selector" range={doutRange} value={secDoutSeletedNum}>
            <AtList>
              <AtListItem title="生效输出DOUT" extraText={secDoutSelected} />
            </AtList>
          </Picker>
          <AtInput name="firstMaxSpeed" title="空间最大速度" confirmType="保存">
            mm/s
          </AtInput>
        </AtForm>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(SafePara);
