import Taro from '@tarojs/taro'

export default {
  namespace: 'project',
  state: [
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