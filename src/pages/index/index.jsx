import React, { useState } from 'react'
import Taro from "@tarojs/taro"
import { View, Button, Text,Navigator,Image } from '@tarojs/components'
import { AtButton, AtInput, AtMessage, AtDivider, AtNoticebar } from "taro-ui";
import './index.less'

function Start () {
const [ip,setIp] = useState("");

const [port,setPort] = useState("8443");

 const changeIP=(IP)=>{
    setIp(IP)
  };

 const changePort=(PORT)=>{
    setPort(PORT)
  };

 const onSubmit=(event)=> {
   let exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
   let reg = ip.match(exp);
   if(reg === null || ip === ""){
     Taro.atMessage({
       message:"IP地址不合法！",
       type:"error"
     })
   }else{
    Taro.navigateTo({
      url:'/pages/connect/index'+'?ip='+ip+'&port='+port
    })}
    return;
  }

    return (
      <View className="index">
        <AtMessage />
        {/* 说明部分，要删掉的
        <View>
          <AtNoticebar>分割线上面的内容为测试使用。当前只是完成了部分页面，加入了websocket连接机制，还没有加入具体的逻辑，所以所有按钮点击均可跳转。页面样式也没做。</AtNoticebar>
          <View style={{display:"flex",flexFlow:"row",marginLeft:"auto",marginRight:"auto"}}>
        <Navigator url="/pages/teach/index" openType="reLaunch"><AtButton size="small" type="secondary" >示教</AtButton></Navigator>
        <Navigator url="/pages/program/index" openType="reLaunch"><AtButton size="small" type="secondary" >程序</AtButton></Navigator>
        <Navigator url="/pages/monitor/index" openType="reLaunch"><AtButton size="small" type="secondary" >监控</AtButton></Navigator>
        <Navigator url="/pages/setup/index" openType="reLaunch"><AtButton size="small" type="secondary" >设置</AtButton></Navigator></View>
        </View>
        {/* 删到这里 
        <AtDivider content="分割线" />*/}
        <View style="text-align:center;padding:30px">
        <Image src='https://forinexbotweb.oss-cn-shanghai.aliyuncs.com/uploads/202007/1LOGO.jpg' className="logo" alt="" mode='aspectFit'/>
        </View>
          <AtInput name="ip" title="IP" placeholder="例:192.168.1.11" onChange={changeIP} className="index-index-input log_ip" value={ip}></AtInput>
          <AtInput name="port" title="Port" placeholder="默认8443" onChange={changePort} className="index-index-input log_port" value={port}></AtInput>
          <AtButton type="primary" className="index-index-button log_conn" onClick={onSubmit}>
            连接
          </AtButton>
          {/* <Text>最近连接（假的）</Text>
          <AtButton type="secondary" style="width:80%;margin-left:10%;margin-top: 24px;">192.168.1.1</AtButton>

          <AtButton type="secondary">192.168.1.2</AtButton>
          <AtButton type="secondary">192.168.1.3</AtButton>
          <AtButton type="secondary">192.168.1.4</AtButton>
          <AtButton type="secondary">192.168.1.5</AtButton> */}
          <View>
            <text className="log_que">遇见问题</text>
          </View>
      </View>
    );
}

export default Start