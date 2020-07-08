import Taro from "@tarojs/taro";
import { CommandList } from "./commandlist";

var getLength = require("utf8-byte-length");
// 发送数据到控制器,command是命令字，data是要发送的数据，data为JSON格式，command为CommandList里面的元素名
export async function sendMSGtoController(command, data) {
  let message = [];
  let dataLength;
  let commandString = CommandList[command];
  dataLength = data !== "" ? JSON.stringify(data).length : 0;
  commandString = commandString === undefined ? command : CommandList[command];
  message.push(0x4e);
  message.push(0x66);
  message.push(dataLength);
  message.push(commandString);

  if (data !== "") {
    message.push(JSON.stringify(data));
  }

  Taro.sendSocketMessage({ data: message });
  console.log("发送数据到控制器", message);
}

// 发送数据到server,command是命令字，data是要发送的数据，data为JSON格式，command为CommandList里面的元素名
export async function sendMSGtoServer(command, data) {
  let message;
  message = [];
  let dataLength;
  let commandString = CommandList[command];
  dataLength = data !== "" ? JSON.stringify(data).length : 0;
  commandString = commandString === undefined ? command : CommandList[command];
  message.push(0x4e);
  message.push(0x67);
  message.push(dataLength);
  message.push(commandString);
  console.log(message);
  data === ""
    ? console.error("发送数据为空")
    : message.push(JSON.stringify(data));

  Taro.sendSocketMessage({ data: message });
  console.log("发送到服务端", message);
}
// 解析收到的数据，返回的值为数组，[command,data]，command为字符串，data为json
export function comeMessage(message) {
  var newArray = message.data.split(",");
  //来自控制器的数据
  if (newArray[0] === "78" && newArray[1] === "102") {
    let dataLenth = newArray[2];
    let command = newArray[3];
    let dataArray = [];
    for (let i = 4; i < newArray.length; i++) {
      dataArray[i - 4] = newArray[i];
    }
    let dataString = dataArray.join(",");
    let newdatalenth = getLength(dataString).toString(); //将data长度转换为字符串
    // 与发来的长度做比较，相同才继续走
    if (newdatalenth === dataLenth) {
      let co = parseFloat(command).toString(16);
      let data = dataString;
      let all = [co, data];
      return all;
    } else {
      Taro.atMessage({
        message: "收到数据的长度不一致",
        type: "error",
        duration: 1000,
      });
    }
  }
  //来自server自己的数据（包括作业文件等）
  else if (newArray[0] === "78" && newArray[1] === "103") {
    let dataLenth = newArray[2];
    let command = newArray[3];
    let dataArray = [];
    for (let i = 4; i < newArray.length; i++) {
      dataArray[i - 4] = newArray[i];
    }
    let dataString = dataArray.join(",");
    let newdatalenth = getLength(dataString).toString(); //将data长度转换为字符串，使用getLength()来将收到的数据转为utf-8格式并获取数据长度
    // 与发来的长度做比较，相同才继续走
    if (newdatalenth === dataLenth) {
      let co = parseFloat(command).toString(16);
      let data = dataString;
      let all = [co, data];
      return new Promise(function (resolve, reject) {
        resolve(all);
      });
    } else {
      Taro.atMessage({
        message: "收到数据的长度不一致",
        type: "error",
        duration: 1000,
      });
    }
  }
}
