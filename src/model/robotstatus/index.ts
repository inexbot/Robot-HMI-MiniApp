import { RobotStatus } from "../../lib/nexdroid";

export default {
  namespace: "robotStatus",
  state: {
    robotAmount: 1,
    operaMode: 0,
    currentRobot: 1,
    currentRobotType: 1,
    /* ROBOT_TYPE:{  
    R_NULL = 0,
    R_GENERAL_6S = 1,
    R_SCARA = 2,
    R_FOURAXIS_PALLET = 3,
    R_FOURAXIS = 4,  
    R_GENERAL_1S = 5,
    R_GENERAL_5S = 6,
    R_GENERAL_6S_1 = 7,
    R_SCARA_TWOAXIS = 8,
    R_SCARA_THREEAXIS = 9,
    R_THREE_CARTESIAN_COORDINATE = 10,
    R_THREE_CARTESIAN_COORDINATE_1 = 11,
    R_FOUR_CARTESIAN_COORDINATE = 12,
  }; */
    multiRobotMode: 0,
    servoStatus: 2,
    deadman: 0,
    teachType: 0,
    runningState: 0,
    teachSpeed: 14,
    runSpeed: 11,
    userCoord: 1,
    toolCoord: 1,
    coordinate: 0,
    currentForwardOrBackward: false,
    pos: [
      2, 1, 111.11, 222.22, 333.33, 444.44, 555.55, 666.66, 777.77, 888.88, 999,
      99, 0, 0, 0,
    ],
    deg: 0,
    posDeg: [0, 0, 0, 0, 0, 0, 0],
  },
  reducers: {
    handleOperaMode(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.operaMode = action.data;
      return _state;
    },
    handleServoStatus(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.servoStatus = action.data;
      return _state;
    },
    handleDeadman(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.deadman = action.data;
      return _state;
    },
    handleSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let res: RobotStatus.SpeedRes = action.data;
      _state.teachSpeed = res.speed;
      return _state;
    },
    handlePos(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let res: RobotStatus.PosRes = action.data;
      _state.pos = res.pos;
      _state.posDeg = res.posDeg;
      return _state;
    },
    handleCoordinate(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.coordinate = action.data;
      return _state;
    },
    handleToolCoord(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.toolCoord = action.data;
      return _state;
    },
    handleUserCoord(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.userCoord = action.data;
      return _state;
    },
  },
};
