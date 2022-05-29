import Taro, { TCPSocket } from "@tarojs/taro";
import utf8 from "utf-8";
import Bf from "buffer/index";
import crc32 from "./crc32";

const Buffer = Bf.Buffer;
export interface Message {
  command: number;
  data: Object;
}

export default class Tcp {
  private Tcp: TCPSocket = Taro.createTCPSocket();
  private bufferPool: Bf.Buffer = Buffer.alloc(0);
  private connected: boolean;
  private onMessageCallback: Function;
  private onConnectedCallback: Function;
  private onCloseCallback: Function;
  private onErrorCallback: Function;
  private heartBeatInterval: NodeJS.Timer | null;
  private resetHeartBeatTimer: NodeJS.Timeout | null;

  static instance: Tcp;
  private constructor() {
    this.Tcp.onConnect(() => {
      if (this.onConnectedCallback) {
        this.onConnectedCallback();
      }
      this.connected = true;
      this.heartBeat();
    });
    this.Tcp.onClose(() => {
      this.stopHeartBeat();
      this.connected = false;
      this.onCloseCallback();
    });
    this.Tcp.onError((result: TCPSocket.onError.CallbackResult) => {
      if (this.onErrorCallback) {
        this.onErrorCallback(result);
      }
      this.Tcp.close();
    });
    this.Tcp.onMessage((result: TCPSocket.onMessage.CallbackResult) => {
      this.receiveBuffer(result.message);
    });
    this.Tcp.offClose(() => {
      console.log("OffClose");
    });
    this.Tcp.offConnect(() => {
      console.log("OffConnect");
    });
    this.Tcp.offError(() => {
      console.log("OffError");
    });
    this.Tcp.offMessage(() => {
      console.log("OffMessage");
    });
  }
  static getInstance(): Tcp {
    if (!this.instance) {
      this.instance = new Tcp();
    }
    return this.instance;
  }
  public connect(ip: string, port: number): void {
    this.Tcp.connect({ address: ip, port: port });
  }
  public setCallback(
    onMessageCallback: Function,
    onConnectedCallback?,
    onCloseCallback?,
    onErrorCallback?
  ): void {
    this.onMessageCallback = onMessageCallback;
    if (onConnectedCallback) {
      this.onConnectedCallback = onConnectedCallback;
    }
    if (onCloseCallback) {
      this.onCloseCallback = onCloseCallback;
    }
    if (onErrorCallback) {
      this.onErrorCallback = onErrorCallback;
    }
  }
  public sendMessage(command, msg: Object) {
    this.stopHeartBeat();
    if (!this.connected) {
      return { result: false, errMsg: "noConnect" };
    } else {
      const message = this.encodeMessage(command, msg);
      if (message) {
        this.Tcp.write(message);
      }
    }
    this.resetHeartBeat();
    return { result: true, errMsg: "" };
  }
  private encodeMessage(command: number, msg: Object): Bf.Buffer | null {
    try {
      const dataString = JSON.stringify(msg);
      const dataBuffer = Buffer.from(
        new Uint8Array(utf8.setBytesFromString(dataString))
      );
      const dataLength = msg ? dataBuffer.byteLength : 0;
      const headBuffer = Buffer.from([0x4e, 0x66]);
      let lengthBuffer = Buffer.alloc(2);
      lengthBuffer.writeIntBE(dataLength, 0, 2);
      let commandBuffer = Buffer.alloc(2);
      commandBuffer.writeUIntBE(command, 0, 2);
      const toCrc32 = Buffer.concat([lengthBuffer, commandBuffer, dataBuffer]);
      const crc32Buffer: Buffer = crc32(toCrc32);
      const message = Buffer.concat([
        headBuffer,
        lengthBuffer,
        commandBuffer,
        dataBuffer,
        crc32Buffer,
      ]);
      return message;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  private receiveBuffer(buffer: ArrayBuffer): void {
    const newBuffer = Buffer.from(buffer);
    this.bufferPool = Buffer.concat([this.bufferPool, newBuffer]);
    this.handleBuffer();
  }
  private handleBuffer(): void {
    const index = this.bufferPool.indexOf("Nf");
    if (index < 0) {
      return;
    }
    const lengthBuffer = this.bufferPool.slice(index + 2, index + 4);
    const length = lengthBuffer.readUIntBE(0, 2);
    const buffer = this.bufferPool.slice(index, index + 2 + 2 + 2 + length + 4);
    if (buffer.length < index + 2 + 2 + 2 + length + 4) {
      return;
    }
    this.bufferPool = this.bufferPool.slice(index + 2 + 2 + 2 + length + 4);
    const decodedMessage: Message = this.decodeMessage(buffer);
    this.handleMessage(decodedMessage);
    this.handleBuffer();
  }
  private decodeMessage(buffer: Bf.Buffer): Message {
    const commandBuffer = buffer.slice(4, 6);
    const dataBuffer = buffer.slice(6, buffer.length - 4);
    const command = commandBuffer.readUIntBE(0, 2);
    const dataStr = dataBuffer.toString();
    const data = dataStr ? JSON.parse(dataStr) : {};
    const message: Message = {
      command: command,
      data: data,
    };
    return message;
  }
  private handleMessage(message: Message): void {
    this.onMessageCallback(message);
  }
  private heartBeat(): void {
    this.heartBeatInterval = setInterval(() => {
      this.sendMessage(0x7266, { time: new Date().getTime() });
    }, 1000);
  }
  private stopHeartBeat(): void {
    if (this.heartBeatInterval) {
      clearInterval(this.heartBeatInterval);
      this.heartBeatInterval = null;
    }
  }
  private resetHeartBeat(): void {
    if (this.heartBeatInterval) {
      this.stopHeartBeat();
    }
    if (this.resetHeartBeatTimer) {
      clearTimeout(this.resetHeartBeatTimer);
      this.resetHeartBeatTimer = null;
    }
    this.resetHeartBeatTimer = setTimeout(() => {
      this.heartBeat();
      this.resetHeartBeatTimer = null;
    }, 1000);
  }
}
