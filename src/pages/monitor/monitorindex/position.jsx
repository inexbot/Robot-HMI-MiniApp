import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import { connect } from "react-redux";
import Header from "../../../component/header";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    position: state.robotStatus.pos,
    coordinate: state.robotStatus.currentCoordinate,
  };
};
function PositionMonitor(props) {
  const [one, setOne] = useState("");
  const [two, setTwo] = useState("");
  const [three, setThree] = useState("");
  const [four, setFour] = useState("");
  const [five, setFive] = useState("");
  const [six, setSix] = useState("");
  const [a1, setA1] = useState("J1");
  const [a2, setA2] = useState("J2");
  const [a3, setA3] = useState("J3");
  const [a4, setA4] = useState("J4");
  const [a5, setA5] = useState("J5");
  const [a6, setA6] = useState("J6");

  useEffect(() => {
    let pos = props.position;
    setOne(pos[0]);
    setTwo(pos[1]);
    setThree(pos[2]);
    setFour(pos[3]);
    setFive(pos[4]);
    setSix(pos[5]);
  }, [props.position]);

  useEffect(() => {
    let coordinate = props.coordinate;
    switch (coordinate) {
      case 0:
        setA1("J1");
        setA2("J2");
        setA3("J3");
        setA4("J4");
        setA5("J5");
        setA6("J6");
        break;
      case 1:
        setA1("X");
        setA2("Y");
        setA3("Z");
        setA4("A");
        setA5("B");
        setA6("C");
        break;
      case 2:
        setA1("TX");
        setA2("TY");
        setA3("TZ");
        setA4("TA");
        setA5("TB");
        setA6("TC");
        break;
      case 3:
        setA1("UX");
        setA2("UY");
        setA3("UZ");
        setA4("UA");
        setA5("UB");
        setA6("UC");
        break;
      default:
        break;
    }
  }, [props.coordinate]);

  return (
    <View className="monitor">
      <Header />
      <View className="monitor-index">
        <AtList>
          <AtListItem title={a1} extraText={one} />
          <AtListItem title={a2} extraText={two} />
          <AtListItem title={a3} extraText={three} />
          <AtListItem title={a4} extraText={four} />
          <AtListItem title={a5} extraText={five} />
          <AtListItem title={a6} extraText={six} />
        </AtList>
      </View>
    </View>
  );
}

export default connect(mapStateToProps)(PositionMonitor);
