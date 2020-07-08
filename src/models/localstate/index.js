import Taro from "@tarojs/taro";

export default {
  namespace: "localState",
  state: {
    connected:0
  },

  reducers: {
    setConnected(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.connected = action.data;
      return _state;
    },
  },
};
