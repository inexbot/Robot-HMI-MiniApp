export enum OperaMode {
  Teach = 0,
  Circle = 1,
  Repeat = 2,
}
export interface OperaModeGetInterface {}
export interface OperaModeSetInterface {
  mode: OperaMode;
}
export interface OperaModeResInterface extends OperaModeSetInterface {}
export enum TeachType {
  Jog = 0,
  Drag = 1,
}
export interface TeachTypeGetInterface {}
export interface TeachTypeSetInterface {
  teachType: TeachType;
}
export interface TeachTypeResInterface extends TeachTypeSetInterface {}
export enum ServoStatus {
  stop = 0,
  ready = 1,
  error = 2,
  running = 3,
}
export enum MultiRobotMode {
  Single = 0,
  Multi = 1,
}
export interface ServoStatusGetInterface {
  robot: number;
}
export interface ServoStatusSetInterface extends ServoStatusGetInterface {
  status: ServoStatus;
}
export interface ServoStatusResInterface extends ServoStatusSetInterface {
  mode: MultiRobotMode;
}
export enum Coordinate {
  Current = -1,
  Joint = 0,
  Cart = 1,
  Tool = 2,
  User = 3,
}
export interface CoordinateGetInterface {
  robot: number;
}
export interface CoordinateSetInterface extends CoordinateGetInterface {
  coord: Coordinate;
}
export interface CoordinateResInterface extends CoordinateSetInterface {}
export enum Deadman {
  disable = 0,
  enable = 1,
}
export interface DeadmanGetInterface {}
export interface DeadmanSetInterface {
  deadman: Deadman;
}
export interface DeadmanResInterface extends DeadmanSetInterface {}
export interface EmergencyStopInterface {
  robot: number;
}
export interface SpeedSet {
  robot: number;
  teachspeed: number;
  runspeed: number;
}
export interface SpeedGet {
  robot: number;
}
export interface SpeedRes extends SpeedSet {}
export interface PosGet {
  robot: number;
  coord: Coordinate;
}
export interface PosRes extends PosGet {
  pos: number[];
  configuration: number;
  deg: number;
  posDeg: number[];
}

export interface RobotNumberSwitch {
  mode: MultiRobotMode;
  robot: number;
}
export interface RobotNumberGet {}
export interface RobotNumberRes extends RobotNumberSwitch {}
export interface ToolCoordSet {
  robot: number;
  curToolNum: number;
}
export interface ToolCoordGet {
  robot: number;
}
export interface ToolCoordRes extends ToolCoordSet {}
export interface UserCoordSet {
  robot: number;
  userNum: number;
}
export interface UserCoordGet {
  robot: number;
}
export interface UserCoordRes {
  robot: number;
  curUserNum: number;
}
