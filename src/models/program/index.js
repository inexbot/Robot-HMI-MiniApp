import Taro from "@tarojs/taro";

export default {
  namespace: "program",
  state: {
    name: "program",
    success: true, // or false
    possum: 17,
    var: {
      position: [
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 4, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 5, 6, 7, 9, 1, 1, 1, 1, 1, 1, 1, 1],
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
      {
        name: "MOVL",
        para: { POS: "P002", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVC",
        para: { POS: "P003", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVC",
        para: { POS: "P004", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVS",
        para: { POS: "P005", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVS",
        para: { POS: "P006", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVS",
        para: { POS: "P007", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
      {
        name: "MOVS",
        para: { POS: "P008", V: 22, PL: 1, ACC: 10, DEC: 10 },
      },
    ],
  },

  reducers: {
    receiveProgram(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state = action.data.program;
      return _state;
    },
  },
};
