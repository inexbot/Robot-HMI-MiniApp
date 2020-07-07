import React from "react"
import {AtButton} from "taro-ui"

function EmergencyStopButton (){
    const emergencyStop = () =>{
        console.log("紧急停止");
        return;
    }
    return(
        <AtButton onClick={emergencyStop} customStyle={{background:"#ff483f",border:"1px solid #ff463d" ,width:"90vw",marginLeft:"5vw",color:"#ffffff"}}>紧急停止</AtButton>
    )
}
export default EmergencyStopButton