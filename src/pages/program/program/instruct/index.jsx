import React, { useState } from "react";
import "./index.less";
import { View } from "@tarojs/components";

import { Movj, Movl, Movc, Movs } from "../../../../component/instruct";

function Instruct(props) {
  switch (props.instruct) {
    case "MOVJ":
      return (
        <Movj
          row={props.row}
          insertOrChange={props.insertOrChange}
          closeInstruct={props.closeInstruct}
        />
      );
    case "MOVL":
      return (
        <Movl
          row={props.row}
          insertOrChange={props.insertOrChange}
          closeInstruct={props.closeInstruct}
        />
      );
    case "MOVC":
      return (
        <Movc
          row={props.row}
          insertOrChange={props.insertOrChange}
          closeInstruct={props.closeInstruct}
        />
      );
    case "MOVS":
      return (
        <Movs
          row={props.row}
          insertOrChange={props.insertOrChange}
          closeInstruct={props.closeInstruct}
        />
      );

    default:
      return (
        <Movj
          row={props.row}
          insertOrChange={props.insertOrChange}
          closeInstruct={props.closeInstruct}
        />
      );
  }
}
export default Instruct;
