import robotStatus from './robotstatus'
import robotParameter from './robotparameter'
import project from "./project"
import program from "./program"
import IOParameter from "./ioparameter"
import subscriptions from "./subscriptions"
import localState from "./localstate"

export default [
  localState,
  robotStatus,
  robotParameter,
  IOParameter,
  project,
  program,
  subscriptions
]