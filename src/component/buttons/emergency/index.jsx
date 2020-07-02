import React from "react"
import {AtButton} from "taro-ui"

function EmergencyStopButton (){
    const emergencyStop = () =>{
        console.log("紧急停止");
        return;
    }
    return(
        <AtButton onClick={emergencyStop} customStyle={{background:"red"}}>紧急停止</AtButton>
    )
}
export default EmergencyStopButton