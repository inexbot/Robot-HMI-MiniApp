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
    controllerID: "",
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
