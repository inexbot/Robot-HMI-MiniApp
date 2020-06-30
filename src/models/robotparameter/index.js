import Taro from '@tarojs/taro'

export default {
  namespace: 'robotParameter',
  state: {
    Dh:1
  },

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
  },

}