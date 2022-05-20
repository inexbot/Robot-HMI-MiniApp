export default {
  namespace: "dragTrajectory",
  state: {
    TrajName: ["st1", "st2"],
    DragBtnType: false,
  },

  reducers: {
    receiveTrajName(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.TrajName = action.data.TrajName;
      return _state;
    },
    // 停止拖拽时候页面的切换
    changeDragBtnType(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.DragBtnType = !action.data.Start;
      console.log("现在DragBtnType状态改为", !action.data.Start);
      return _state;
    },
  },
};
