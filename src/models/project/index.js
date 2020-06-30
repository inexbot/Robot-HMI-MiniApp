import Taro from '@tarojs/taro'

export default {
  namespace: 'project',
  state: [
    {
      name: "222",
      program: [
        { name: "22", date: "22" },
        { name: "23", date: "22" },
        { name: "24", date: "22" },
        { name: "25", date: "22" },
        { name: "22", date: "22" },
        { name: "23", date: "22" },
        { name: "24", date: "22" },
        { name: "25", date: "22" },
        { name: "22", date: "22" },
        { name: "23", date: "22" },
        { name: "24", date: "22" },
        { name: "25", date: "22" },
        { name: "22", date: "22" },
        { name: "23", date: "22" },
        { name: "24", date: "22" },
        { name: "25", date: "22" },
        { name: "22", date: "22" },
        { name: "23", date: "22" },
        { name: "24", date: "22" },
        { name: "25", date: "22" },
      ],
    },
    {
      name: "333",
      program: [{ name: "21", date: "44" }],
    },
    {
      name: "444",
      program: [{ name: "33", date: "55" }],
    },
  ],

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
  },

}