export interface GoHome {
  robot: number;
  type: number;
}
export interface ClearFault {
  robot: number;
}
export enum Direction {
  Forward = 1,
  Reverse = -1,
}
export interface JogStart {
  axis: number;
  direction: Direction;
}
export interface JogStop {
  axis: number;
}
