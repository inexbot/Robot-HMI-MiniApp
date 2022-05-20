export declare module RobotStatus {
  enum OperaMode {
    Teach = 0,
    Circle = 1,
    Repeat = 2,
  }
  interface OperaModeGetInterface {}
  interface OperaModeSetInterface {
    mode: OperaMode;
  }
  export interface OperaModeResInterface extends OperaModeSetInterface {}
  enum TeachType {
    Jog = 0,
    Drag = 1,
  }
  interface TeachTypeGetInterface {}
  interface TeachTypeSetInterface {
    teachType: TeachType;
  }
  interface TeachTypeResInterface extends TeachTypeSetInterface {}
  enum ServoStatus {
    stop = 0,
    ready = 1,
    error = 2,
    running = 3,
  }
  enum MultiRobotMode {
    Single = 0,
    Multi = 1,
  }
  interface ServoStatusGetInterface {
    robot: number;
  }
  interface ServoStatusSetInterface extends ServoStatusGetInterface {
    status: ServoStatus;
  }
  interface ServoStatusResInterface extends ServoStatusSetInterface {
    mode: MultiRobotMode;
  }
  enum Coordinate {
    Current = -1,
    Joint = 0,
    Cart = 1,
    Tool = 2,
    User = 3,
  }
  interface CoordinateGetInterface {
    robot: number;
  }
  interface CoordinateSetInterface extends CoordinateGetInterface {
    coord: Coordinate;
  }
  interface CoordinateResInterface extends CoordinateSetInterface {}
  enum Deadman {
    disable = 0,
    enable = 1,
  }
  interface DeadmanGetInterface {}
  interface DeadmanSetInterface {
    deadman: Deadman;
  }
  interface DeadmanResInterface extends DeadmanSetInterface {}
  interface EmergencyStopInterface {
    robot: number;
  }
  interface SpeedSet {
    robot: number;
    teachspeed: number;
    runspeed: number;
  }
  interface SpeedGet {
    robot: number;
  }
  interface SpeedRes extends SpeedSet {}
  interface PosGet {
    robot: number;
    coord: Coordinate;
  }
  interface PosRes extends PosGet {
    pos: number[];
    configuration: number;
    deg: number;
    posDeg: number[];
  }

  interface RobotNumberSwitch {
    mode: MultiRobotMode;
    robot: number;
  }
  interface RobotNumberGet {}
  interface RobotNumberRes extends RobotNumberSwitch {}
}
