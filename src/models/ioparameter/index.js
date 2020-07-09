import Taro from "@tarojs/taro";

export default {
  namespace: "IOParameter",
  state: {
    dinStatus: [0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, -1, -1],
    doutStatus: [0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0],
    ainStatus: [1.11, 2.22, -1],
    aoutStatus: [2.12, 3.12, -1],
  },

  reducers: {
    receiveDout(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.doutStatus = action.data.status;
      return _state;
    },
    receiveDin(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.dinStatus = action.data.status;
      return _state;
    },
    receiveAout(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.aoutStatus = action.data.value;
      return _state;
    },
    receiveAin(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.ainStatus = action.data.value;
      return _state;
    },
  },
};
