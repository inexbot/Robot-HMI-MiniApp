import React, { useState,useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabBar } from "taro-ui";
import { sendMSGtoController } from "../../../service/network";

function RunningBar(props) {
  const [runMode, setRunMode] = useState("运行");
  const tabList = [{ title: "示教模式" }, { title: runMode }];
  const [pName, setPName] = useState("");
  const [pSuffixname, setPSuffixname] = useState("");

  useEffect(() => {
    let programName = props.name;
    if (programName !== "") {
      let indexOfDot = programName.indexOf(".");
      let name = programName.substring(0, indexOfDot);
      let suffixname = programName.substring(indexOfDot);
      setPName(name);
      setPSuffixname(suffixname);
    } else {
      return;
    }
  }, [props.name]);
  const handleClick = (value) => {
    console.log(value);
    if (value === 0) {
      let data1 = {
        mode: 0,
      };
      sendMSGtoController("OPERATION_MODE_SET", data1);
      Taro.redirectTo({
        url: "/pages/program/program/index",
      });
    } else if (value === 1) {
      if (runMode === "运行") {
        let pData = {
          robot: 1,
          jobname: pName,
          suffixname: pSuffixname,
          line: 1,
          conntinueRun: 0,
        };
        sendMSGtoController("JOBSEND_DONE", pData);
        setRunMode("暂停");
      } else if (runMode === "暂停") {
        let sData = {
          robot: 1,
        };
        sendMSGtoController("STOP_JOB_RUN", sData);
        setRunMode("运行");
      }
    }
    return;
  };

  return (
    <View>
      <AtTabBar fixed tabList={tabList} onClick={handleClick} />
    </View>
  );
}

export default RunningBar;
