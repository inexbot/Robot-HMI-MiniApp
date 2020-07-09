import Taro from "@tarojs/taro";

export default {
  namespace: "program",
  state: {
    name: "program",
    Success: true, // or false
    possum: 17,
    var: {
      position: [
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
      number: {
        I001: 2,
        D001: 1.11,
        B001: 1,
      },
    },
    instruct: [
      {
        name: "MOVJ",
        para: { POS: "P001", VJ: 22, PL: 1, ACC: 10, DEC: 10 },
      },
    ],
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
