import Taro from '@tarojs/taro'

export default {
  namespace: 'robotParameter',
  state: {
    dhPara: {
      Link: [
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
        { a: 1, b: 2, c: 3, d: 4, theta: 5 },
      ],
      CoupleCoe: {
        Couple_Coe_1_2: 1,
        Couple_Coe_2_3: 2,
        Couple_Coe_3_2: 3,
        Couple_Coe_3_4: 3,
        Couple_Coe_4_5: 3,
        Couple_Coe_4_6: 3,
        Couple_Coe_5_6: 3,
      },
      upsideDown: true,
    },
    jointPara: {
      axis1: {
        AxisNum: 1,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis2: {
        AxisNum: 2,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 5,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis3: {
        AxisNum: 3,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis4: {
        AxisNum: 4,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis5: {
        AxisNum: 5,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis6: {
        AxisNum: 6,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
      axis7: {
        AxisNum: 7,
        AxisDirection: 1,
        DeRatedVel: -11,
        Direction: -1,
        EncoderResolution: 17,
        MaxAcc: 2.99,
        MaxDeRotSpeed: -1,
        MaxDecel: -2.99,
        MaxRotSpeed: 1,
        NegSWLimit: -180,
        PosSWLimit: 180,
        RatedDeRotSpeed: -4000,
        RatedRotSpeed: 4000,
        RatedVel: 166,
        ReducRatio: 143,
      },
    },
  },

  reducers: {
    receiveDhPara(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.dhPara = action.data;
      return _state;
    },
    /* 接收关节参数 */
    receiveJointPara(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      switch (action.data.Joint.AxisNum) {
        case 1:
          _state.jointPara.axis1 = action.data.Joint;
          break;
        case 2:
          _state.jointPara.axis2 = action.data.Joint;
          break;
        case 3:
          _state.jointPara.axis3 = action.data.Joint;
          break;
        case 4:
          _state.jointPara.axis4 = action.data.Joint;
          break;
        case 5:
          _state.jointPara.axis5 = action.data.Joint;
          break;
        case 6:
          _state.jointPara.axis6 = action.data.Joint;
          break;
        case 7:
          _state.jointPara.axis7 = action.data.Joint;
          break;
        default:
          break;
      }
      return _state;
    },
  },

}