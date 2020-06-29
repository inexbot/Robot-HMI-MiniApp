import Taro, { useState,useEffect } from "@tarojs/taro";
import { View, Button, Text } from "@tarojs/components";
import {connect} from "@tarojs/redux"

const mapStateToProps = state => {
    return {
      hh: state.robotStatus.pos
    };
  };

function ConnectState(props){
const [connectState,setConnectState] = useState("正在连接...")
const [display1,setDisplay1] = useState("none")
const [display2,setDisplay2] = useState("none")
useEffect(()=>{
    let IP = "wss://"+props.ip
    console.log(IP)
    Taro.connectSocket({
        url:IP
    })
},[])
    return(
<View>
    <View>{connectState}</View>
    <View style={{display:display1}}><Text>正在获取数据...</Text></View>
    <View style={{display:display2}}><Text>获取成功</Text><Text>正在跳转</Text></View>
</View>
    );
}

export default connect(mapStateToProps)(ConnectState)