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
              data: message.data.mode,
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
