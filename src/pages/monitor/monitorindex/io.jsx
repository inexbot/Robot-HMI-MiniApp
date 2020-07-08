import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { connect } from "react-redux";
import "../index.less";

const mapStateToProps = (state) => {
  return {
    dinStatus: state.IOParameter.dinStatus,
    doutStatus: state.IOParameter.doutStatus,
    ainStatus: state.IOParameter.ainStatus,
    aoutStatus: state.IOParameter.aoutStatus,
  };
};
function IOMonitor(props) {
  const [dinList, setDinList] = useState();
  const [doutList, setDoutList] = useState();
  const [ainList, setAinList] = useState();
  const [aoutList, setAoutList] = useState();

  const handleSwitchChange = (value) => {
    console.log(value);
    return;
  };

  useEffect(() => {
    let din = props.dinStatus;
    let newDinList = [];
    let key = 1;
    din.forEach((value, index, array) => {
      if (value === -1) {
        newDinList.push(<AtListItem title="无此端口" key={key} />);
      } else {
        newDinList.push(
          <AtListItem
            title={`DIN${index + 1}`}
            extraText={`${value}`}
            key={key}
          />
        );
      }
      key++;
    });
    setDinList(newDinList);
  }, [props.dinStatus]);

  useEffect(() => {
    let dout = props.doutStatus;
    let newDoutList = [];
    let key = 1;
    dout.forEach((value, index, array) => {
      if (value === -1) {
        newDoutList.push(<AtListItem title="无此端口" key={key} />);
      } else {
        newDoutList.push(
          <AtListItem
            title={`DOUT${index + 1}`}
            isSwitch
            switchIsCheck={value}
            onSwitchChange={handleSwitchChange}
            key={key}
          />
        );
      }
      key++;
    });
    setDoutList(newDoutList);
  }, [props.doutStatus]);

  useEffect(() => {
    let ain = props.ainStatus;
    let newAinList = [];
    let key = 1;
    ain.forEach((value, index, array) => {
      if (value === -1) {
        newAinList.push(<AtListItem title="无此端口" key={key} />);
      } else {
        newAinList.push(
          <AtListItem
            title={`AIN${index + 1}`}
            extraText={`${value}`}
            key={key}
          />
        );
      }
      key++;
    });
    setAinList(newAinList);
  }, [props.ainStatus]);

  useEffect(() => {
    let aout = props.aoutStatus;
    let newAoutList = [];
    let key = 1;
    aout.forEach((value, index, array) => {
      if (value === -1) {
        newAoutList.push(<AtListItem title="无此端口" key={key} />);
      } else {
        newAoutList.push(
          <AtListItem
            title={`AIN${index + 1}`}
            extraText={`${value}`}
            key={key}
          />
        );
      }
      key++;
    });
    setAoutList(newAoutList);
  }, [props.aoutStatus]);
  const [tabCurrent, setTabCurrent] = useState(0);
  const tabClick = (value) => {
    setTabCurrent(value);
  };
  return (
    <View className="monitor">
      <AtTabs
        tabList={[
          { title: "数字输入" },
          { title: "数字输出" },
          { title: "模拟输入" },
          { title: "模拟输出" },
        ]}
        current={tabCurrent}
        onClick={tabClick}
      >
        <AtTabsPane current={tabCurrent} index={0}>
          <View className="ioTabPane">
            <AtList>{dinList}</AtList>
          </View>
        </AtTabsPane>
        <AtTabsPane current={tabCurrent} index={1}>
          <View className="ioTabPane">
            <AtList>{doutList}</AtList>
          </View>
        </AtTabsPane>
        <AtTabsPane current={tabCurrent} index={2}>
          <View className="ioTabPane">
            <AtList>{ainList}</AtList>
          </View>
        </AtTabsPane>
        <AtTabsPane current={tabCurrent} index={3}>
          <View className="ioTabPane">
            <AtList>{aoutList}</AtList>
          </View>
        </AtTabsPane>
      </AtTabs>
    </View>
  );
}

export default connect(mapStateToProps)(IOMonitor);
