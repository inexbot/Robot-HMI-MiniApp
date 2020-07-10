import Taro from "@tarojs/taro";

export default {
  namespace: "project",
  state: {
    project: [
      {
        name: "工程1",
        program: [
          { name: "程序a.JBR", date: "2020-07-10" },
          { name: "程序b.JBR", date: "2020-07-10" },
          { name: "程序c.JBR", date: "2020-07-10" },
          { name: "程序d.JBR", date: "2020-07-10" },
        ],
      },
      {
        name: "工程2",
        program: [
          { name: "工程1.JBR", date: "2020-07-11" },
          { name: "工程2.JBR", date: "2020-07-11" },
          { name: "工程3.JBR", date: "2020-07-11" },
          { name: "工程4.JBR", date: "2020-07-11" },
          { name: "工程5.JBR", date: "2020-07-11" },
        ],
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
