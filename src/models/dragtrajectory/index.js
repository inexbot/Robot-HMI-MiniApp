import Taro from "@tarojs/taro";

export default {
  namespace: "dragTrajectory",
  state: {
    TrajName: ["st1", "st2"],
  },

  reducers: {
    receiveTrajName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.TrajName = action.data.TrajName;
      return _state;
    },
  },
};
