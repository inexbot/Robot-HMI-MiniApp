import { TCPSocket } from "@tarojs/taro";
import Tcp, { Message } from "../../lib/tcp";
import { Command, RobotStatus } from "../../lib/nexdroid";

export default {
  namespace: "subscriptions",
  state: {
    noState: "",
  },
  subscriptions: {
    Socket({ dispatch }) {
      const tcp = Tcp.getInstance();
      function onConnected() {
        dispatch({
          type: "tcp/changeConnected",
          data: true,
        });
        dispatch({
          type: "tcp/changeErrMsg",
          data: "",
        });
      }
      function onClose() {
        dispatch({
          type: "tcp/changeConnected",
          data: false,
        });
      }
      function onError(result: TCPSocket.onError.CallbackResult) {
        dispatch({
          type: "tcp/changeConnected",
          data: false,
        });
        dispatch({
          type: "tcp/changeErrMsg",
          data: result.errMsg.toString(),
        });
      }
      function onMessage(message: Message) {
        switch (message.command) {
          case Command.OperaModeRes:
            dispatch({
              type: "robotStatus/handleOperaMode",
              data: (message.data as RobotStatus.OperaModeResInterface).mode,
            });
            break;
          case Command.ServoStatusRes:
            dispatch({
              type: "robotStatus/handleServoStatus",
              data: (message.data as RobotStatus.ServoStatusResInterface)
                .status,
            });
            break;
          case Command.DeadmanRes:
            dispatch({
              type: "robotStatus/handleDeadman",
              data: (message.data as RobotStatus.DeadmanResInterface).deadman,
            });
            break;
          case Command.SpeedRes:
            dispatch({
              type: "robotStatus/handleSpeed",
              data: message.data as RobotStatus.SpeedRes,
            });
            break;
          case Command.PosRes:
            dispatch({
              type: "robotStatus/handlePos",
              data: message.data as RobotStatus.PosRes,
            });
            break;
          case Command.CoordinateRes:
            dispatch({
              type: "robotStatus/handleCoordinate",
              data: (message.data as RobotStatus.CoordinateResInterface).coord,
            });
            break;
          case Command.ToolCoordRes:
            dispatch({
              type: "robotStatus/handleToolCoord",
              data: (message.data as RobotStatus.ToolCoordRes).curToolNum,
            });
            break;
          case Command.UserCoordRes:
            dispatch({
              type: "robotStatus/handleUserCoord",
              data: (message.data as RobotStatus.UserCoordRes).curUserNum,
            });
            break;
          default:
            break;
        }
      }
      tcp.setCallback(onMessage, onConnected, onClose, onError);
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
