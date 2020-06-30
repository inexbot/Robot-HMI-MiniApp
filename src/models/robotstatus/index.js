import Taro from '@tarojs/taro'

export default {
  namespace: 'robotStatus',
  state: {
    pos:[1,"sssss",1]
  },

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
  },

}