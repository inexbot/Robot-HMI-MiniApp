import Taro from "@tarojs/taro";

export default {
  namespace: "controllerConfig",
  state: {
    network: [],
    //   网口数 4303
    /* num: 1, */
    num: 0,
    //   控制器ID 5303
    /* controllerID: "" */
    controllerID: "NNNOOOCONTROLLERID",
    connectIP: "11.11.11.11",
    connectPort: "1234",
  },

  reducers: {
    setConnect(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.connectIP = action.data.ip;
      _state.connectPort = action.data.port;
      return _state;
    },
  },
};
