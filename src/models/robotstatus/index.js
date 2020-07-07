import Taro from "@tarojs/taro";

export default {
  namespace: "robotStatus",
  state: {
    robotAmount: 4,
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
    currentRobotServoState: 0,
    deadmanState: 0,
    currentRobotRunningState: 0,
    handleSpeed: 1,
    runningSpeed: 1,
    currentUser: 1,
    currentTool: 1,
    currentCoordinate: 1,
    currentForwardOrBackward: false,
    pos: [
      2,
      1,
      111.11,
      222.22,
      333.33,
      444.44,
      555.55,
      666.66,
      777.77,
      888.88,
      999,
      99,
      0,
      0,
      0,
    ],
    deg: 0,
    posDeg: [0, 0, 0, 0, 0, 0, 0],
    robot1OuterAmount: "3",
    robot2OuterAmount: "3",
    robot3OuterAmount: "3",
    robot4OuterAmount: "3",
    outerActivedRobot: "robot1",
    outerActivedOuter: "转台1",
    count: 2,
    index: 3,
    robot1OpenedProgram: false,
    robot1CurrentProgram: "",
    robot2OpenedProgram: false,
    robot2CurrentProgram: "",
    robot3OpenedProgram: false,
    robot3CurrentProgram: "",
    robot4OpenedProgram: false,
    robot4CurrentProgram: "",
    currentTorque: [1, 1, 1, 1, 1, 1],
    maxTorque: [2, 2, 2, 2, 2, 2],
  },
  reducers: {
    receiveCurrentRobot(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.currentRobot = action.data.robot;
      _state.multiRobotMode = action.data.mode;
      sendCheckCurrentRobotState(_state.currentRobot);
      return _state;
    },
    receiveRobotServoState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.multiRobotMode = action.data.mode;
      if (action.data.robot === _state.currentRobot) {
        _state.currentRobotServoState = action.data.status;
      }
      if (action.data.status === 2) {
        console.error(`机器人${action.data.robot}伺服报错！`);
      }
      return _state;
    },
    receiveRobotRunningState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      if (action.data.robot === _state.currentRobot) {
        _state.currentRobotRunningState = action.data.status;
      }
      return _state;
    },
    /* 接收机器人的速度 */
    receiveRobotSpeed(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let speed = action.data.speed;
      let robot = action.data.robot;
      if (robot === _state.currentRobot) {
        if (_state.operaMode === 0) {
          _state.handleSpeed = speed;
        } else {
          _state.runningSpeed = speed;
        }
      } else {
        showMessage.info(`机器人${robot}的速度为${speed}`);
      }
      return _state;
    },
    /* 接收当前机器人的用户坐标系 */
    receiveCurrentUser(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let user = action.data.curUserNum;
      if (_state.currentRobot === robot) {
        _state.currentUser = user;
      } else {
        showMessage.info(`机器人${robot}的用户坐标切换为${user}`);
      }
      return _state;
    },
    /* 接收当前机器人的工具坐标系 */
    receiveCurrentTool(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let tool = action.data.curToolNum;
      if (_state.currentRobot === robot) {
        _state.currentTool = tool;
      } else {
        showMessage.info(`机器人${robot}的用户坐标切换为${tool}`);
      }
      return _state;
    },
    /* 接收当前机器人的坐标系 */
    receiveCurrentCoordinate(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      let robot = action.data.robot;
      let coord = action.data.coord;
      if (_state.currentRobot === robot) {
        _state.currentCoordinate = coord;
      } else {
        showMessage.info(`机器人${robot}的坐标系切换为${coord}`);
      }
      return _state;
    },
    /* 接收当前机器人正序运行还是倒序运行 */
    receiveCurrentForwardOrBackward(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.currentForwardOrBackward = action.data.switch;
      return _state;
    },
    /* 接收伺服编码低压报警 */
    receiveServoEncoderUnderVoltageState(state, action) {
      if (action.data.encoderUndervoltage === true) {
        notification.error({
          message: `编码器低压报警！`,
          description: `机器人${action.data.robot}编码器低压报警！`,
          duration: 0,
        });
      }
      return state;
    },
    /* 接收运行次数 */
    receiveCycleCountRespond(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.count = action.data.count;
      _state.index = action.data.index;
      return _state;
    },
    /* 设置上电返回 */
    receiveDeadmanState(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.deadmanState = action.data.deadman;
      return _state;
    },
    /* 设置模式成功 */
    receiveSetModeSuccess(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.operaMode = action.data.mode;
      return _state;
    },
    /* 接收当前位置 */
    receiveCurrentPos(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.robotStatus.pos = action.data.pos;
      _state.robotStatus.posDeg = action.data.posDeg;
      return _state;
    },
  },
};
