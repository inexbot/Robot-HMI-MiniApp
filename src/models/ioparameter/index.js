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
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
