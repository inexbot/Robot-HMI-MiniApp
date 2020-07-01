import Taro from "@tarojs/taro";

export default {
  namespace: "IOParameter",
  state: {
    IOMain: {
        robot1DinAmount: "16",
        robot2DinAmount: "16",
        robot3DinAmount: "16",
        robot4DinAmount: "16",
        robot1DoutAmount: "16",
        robot2DoutAmount: "16",
        robot3DoutAmount: "16",
        robot4DoutAmount: "16",
        robot1AinAmount: "16",
        robot2AinAmount: "16",
        robot3AinAmount: "16",
        robot4AinAmount: "16",
        robot1AoutAmount: "16",
        robot2AoutAmount: "16",
        robot3AoutAmount: "16",
        robot4AoutAmount: "16"
      }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};

