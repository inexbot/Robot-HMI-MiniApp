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
        <div>
          指令行{props.row}，指令名{props.name}没有修改界面
        </div>
      );
  }
}
export default Instruct;
