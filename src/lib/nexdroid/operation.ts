export declare module Operation {
  interface GoHome {
    robot: number;
    type: number;
  }
  interface ClearFault {
    robot: number;
  }
  enum Direction {
    Forward = 1,
    Reverse = -1,
  }
  interface JogStart {
    axis: number;
    direction: Direction;
  }
  interface JogStop {
    axis: number;
  }
}
