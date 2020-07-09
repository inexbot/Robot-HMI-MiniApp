import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { connect } from "react-redux";
import { sendMSGtoController } from "../../../service/network";
import Header from "../../../component/header";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    torque: state.robotStatus.currentTorque,
    maxTorque: state.robotStatus.maxTorque,
  };
};
function PositionMonitor(props) {
  const [T1, ST1] = useState(0);
  const [T2, ST2] = useState(0);
  const [T3, ST3] = useState(0);
  const [T4, ST4] = useState(0);
  const [T5, ST5] = useState(0);
  const [T6, ST6] = useState(0);
  const [MT1, SMT1] = useState(0);
  const [MT2, SMT2] = useState(0);
  const [MT3, SMT3] = useState(0);
  const [MT4, SMT4] = useState(0);
  const [MT5, SMT5] = useState(0);
  const [MT6, SMT6] = useState(0);

  useEffect(() => {
    let sendInquire;
    sendInquire = setInterval(() => {
      let data = {
        robot: 1,
      };
      sendMSGtoController("CURRENTTORQ_INQUIRE", data);
    }, 500);
    return () => {
      clearInterval(sendInquire);
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
    };
  }, []);

  useEffect(() => {
    let tor = props.torque;
    ST1(tor[0]);
    ST2(tor[1]);
    ST3(tor[2]);
    ST4(tor[3]);
    ST5(tor[4]);
    ST6(tor[5]);
  }, [props.torque]);
  useEffect(() => {
    let mt = props.maxTorque;
    SMT1(mt[0]);
    SMT2(mt[1]);
    SMT3(mt[2]);
    SMT4(mt[3]);
    SMT5(mt[4]);
    SMT6(mt[5]);
  }, [props.maxTorque]);

  return (
    <View className="monitor">
      <Header />
      <View className="monitor-index">
        <Text className="title_top">力矩</Text>
        <AtList>
          <AtListItem title="J1" extraText={`扭矩:${T1} 最大:${MT1}`} />
          <AtListItem title="J2" extraText={`扭矩:${T2} 最大:${MT2}`} />
          <AtListItem title="J3" extraText={`扭矩:${T3} 最大:${MT3}`} />
          <AtListItem title="J4" extraText={`扭矩:${T4} 最大:${MT4}`} />
          <AtListItem title="J5" extraText={`扭矩:${T5} 最大:${MT5}`} />
          <AtListItem title="J6" extraText={`扭矩:${T6} 最大:${MT6}`} />
        </AtList>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(PositionMonitor);
