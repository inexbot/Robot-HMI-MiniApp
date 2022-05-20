export default {
  namespace: "tcp",
  state: {
    connected: false,
    errMsg: "",
  },

  reducers: {
    changeConnected(state, action) {
      console.log(action);
      let _state = JSON.parse(JSON.stringify(state));
      _state.connected = action.data;
      return _state;
    },
    // 停止拖拽时候页面的切换
    changeErrMsg(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.errMsg = action.data;
      return _state;
    },
  },
};
