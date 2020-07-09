import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtList, AtListItem, AtTabs, AtTabsPane } from "taro-ui";
import { sendMSGtoController } from "../../../service/network";
import { connect } from "react-redux";
import Header from "../../../component/header";
import "./index.less";

const mapStateToProps = (state) => {
  return {
    dinStatus: state.IOParameter.dinStatus,
    doutStatus: state.IOParameter.doutStatus,
    ainStatus: state.IOParameter.ainStatus,
    aoutStatus: state.IOParameter.aoutStatus,
  };
};
function IOMonitor(props) {
  const [dinList, setDinList] = useState([]);
  const [doutList, setDoutList] = useState([]);
  const [ainList, setAinList] = useState([]);
  const [aoutList, setAoutList] = useState([]);

  function consDF(val) {
    return (value) => {
      console.log(value);
      let st;

      if (value.detail.value === true) {
        st = 1;
      } else {
        st = 0;
      }

      let data = {
        port: val,
        status: st,
      };
      sendMSGtoController("GPIO_DOUT_SET", data);
    };
  }
  const handleSwitchChange = {
    Dout1: consDF(1),
    Dout2: consDF(2),
    Dout3: consDF(3),
    Dout4: consDF(4),
    Dout5: consDF(5),
    Dout6: consDF(6),
    Dout7: consDF(7),
    Dout8: consDF(8),
    Dout9: consDF(9),
    Dout10: consDF(10),
    Dout11: consDF(11),
    Dout12: consDF(12),
    Dout13: consDF(13),
    Dout14: consDF(14),
    Dout15: consDF(15),
    Dout16: consDF(16),
  };

  useEffect(() => {
    let sendInquire;
    sendInquire = setInterval(() => {
      sendMSGtoController("GPIO_DOUT_INQUIRE", "");
      sendMSGtoController("GPIO_DIN_INQUIRE", "");
      sendMSGtoController("ANALOG_OUT_INQUIRE", "");
      sendMSGtoController("ANALOG_IN_INQUIRE", "");
    }, 1000);
    return () => {
      clearInterval(sendInquire);
      let deadmanData = {
        deadman: 0,
      };
      sendMSGtoController("DEADMAN_STATUS_SET", deadmanData);
    };
  }, []);

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
        let val;
        if (value === 1) {
          val = true;
        } else {
          val = false;
        }
        newDoutList.push(
          <AtListItem
            title={`DOUT${index + 1}`}
            isSwitch
            switchIsCheck={val}
            onSwitchChange={handleSwitchChange[`Dout${key}`]}
            key={key}
            id={`dout${key}`}
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
      <Header />
      <View className="monitor-index">
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
    </View>
  );
}

export default connect(mapStateToProps)(IOMonitor);
