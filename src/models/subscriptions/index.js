import Taro from "@tarojs/taro";
import {comeMessage} from "../../service/network"

export default {
  namespace: "subscriptions",
  state: {
    noState: "",
  },
  subscriptions: {
    detectSocketError({dispatch}){
      Taro.onSocketError((err)=>{
        console.log(`连接错误${err.errMsg}`);
        dispatch({
          type:"localState/setConnected",
          data:2
        })
      });
    },
    detectSocketClose({dispatch}){
      Taro.onSocketClose((res)=>{
        console.log(`连接断开${res.reason}`);
        dispatch({
          type:"localState/setConnected",
          data:0
        })
      });
    },
    Websocket({ dispatch }) {
        var data = "";
        Taro.onSocketMessage((message)=>{
            console.log(message);
            data = comeMessage(message);
            let command;
            command = data[0];
            let dataString;
            if (data[1] === undefined) {
              console.error(`接收到空数据，命令字为${command}`);
              return;
            }
            if (data[1] === "") {
              dataString = "";
            } else {
              dataString = JSON.parse(data[1]);
            }
            /* 命令字 */
            console.group("接收到控制器数据");
            console.log("命令字", command);
            console.log("数据", dataString);
            console.groupEnd();
            switch (command) {
              case "4303":
                dispatch({
                  type: "controllerConfig/receiveControllerIP",
                  data: dataString,
                });
                break;
              case "5053":
                dispatch({
                  type: "controllerConfig/setID",
                  data: dataString,
                });
                break;
              case "2e06":
                dispatch({
                  type: "robotStatus/receiveRobotAmount",
                  data: dataString,
                });
                break;
              case "2103":
                dispatch({
                  type: "receiveSetModeSuccess",
                  data: dataString,
                });
                break;
              case "5003":
                dispatch({
                  type: "robotStatus/receiveCurrentRobot",
                  data: dataString,
                });
                break;
              case "2e03":
                dispatch({
                  type: "robotStatus/receiveCurrentRobotType",
                  data: dataString,
                });
                break;
              case "2303":
                dispatch({
                  type: "robotStatus/receiveDeadmanState",
                  data: dataString,
                });
                break;
              case "2003":
                dispatch({
                  type: "robotStatus/receiveRobotServoState",
                  data: dataString,
                });
                break;
              case "3d03":
                dispatch({
                  type: "robotStatus/receiveRobotRunningState",
                  data: dataString,
                });
                break;
              case "2603":
                dispatch({
                  type: "robotStatus/receiveRobotSpeed",
                  data: dataString,
                });
                break;
              case "3c0c":
                dispatch({
                  type: "robotStatus/receiveCurrentUser",
                  data: dataString,
                });
                break;
              case "380c":
                dispatch({
                  type: "robotStatus/receiveCurrentTool",
                  data: dataString,
                });
                break;
              case "2203":
                dispatch({
                  type: "robotStatus/receiveCurrentCoordinate",
                  data: dataString,
                });
                break;
              case "2406":
                dispatch({
                  type: "robotStatus/receiveCurrentForwardOrBackward",
                  data: dataString,
                });
                break;
              case "3306":
                dispatch({
                  type: "robotStatus/receiveServoEncoderUnderVoltageState",
                  data: dataString,
                });
                break;
              case "5013":
                dispatch({
                  type: "robotStatus/receiveCycleCountRespond",
                  data: dataString,
                });
                break;
              case "2a03":
                dispatch({
                  type: "robotStatus/receiveCurrentPos",
                  data: dataString,
                });
                break;
              case "3a03":
                dispatch({
                  type: "robotParameter/receiveDhPara",
                  data: dataString,
                });
                break;
              case "3b03":
                dispatch({
                  type: "robotParameter/receiveJointPara",
                  data: dataString,
                });
                break;
              case "1112":
                dispatch({
                  type: "project/receiveProjectData",
                  data: dataString,
                });
                break;
              case "1114":
                dispatch({
                  type: "program/receiveProgram",
                  data: dataString,
                });
                break;
              // 接收到报错信息
              case "2b03":
                if (dataString.data === "unInitFinish") {
                  receiveCheckServerState(false);
                  dispatch({
                    type: "serverInit",
                    data: 0,
                  });
                  break;
                } else if (dataString.data === "initFinish") {
                  receiveCheckServerState(true);
                  dispatch({
                    type: "serverInit",
                    data: 1,
                  });
                  break;
                }
                console.error(dataString.data);
                Taro.atMessage({
                  message: `报错！\n${dataString.data}`,
                  type:"error",
                  duration: 3000,
                });
                break;
              // 如果命令字没有查询到
              default:
                console.error("接收到错误信息");
                console.error(
                  `数据格式异常。\n 完整信息：${message} \n 命令字：${command} \n 数据：${dataString}`
                );
            }
        })
      },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
