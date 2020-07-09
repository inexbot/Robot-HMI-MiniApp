import Taro from "@tarojs/taro";

export default {
  namespace: "project",
  state: {
    project: [
      {
        name: "333",
        program: [{ name: "21", date: "44" }],
      },
      {
        name: "444",
        program: [{ name: "33", date: "55" }],
      },
    ],
  },

  reducers: {
    receiveProjectData(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.project = action.data.project;
      return _state;
    },
  },
};
