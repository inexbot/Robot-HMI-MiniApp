import robotStatus from "./robotstatus";
import robotParameter from "./robotparameter";
import project from "./project";
import program from "./program";
import IOParameter from "./ioparameter";
import subscriptions from "./subscriptions";
import controllerConfig from "./controllerconfig";
import localState from "./localstate";
import dragTrajectory from "./dragtrajectory";

export default [
  localState,
  robotStatus,
  robotParameter,
  IOParameter,
  project,
  program,
  controllerConfig,
  dragTrajectory,
  subscriptions,
];
