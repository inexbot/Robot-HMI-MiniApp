import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import Connect from "../../../asset/connect.png";

const mapStateToProps = (state) => {
  return {
    connected: state.tcp.connected,
  };
};

function ConnectState({ connected, className }) {
  function reConnect() {
    if (connected) {
      return;
    }
    Taro.redirectTo({ url: "/pages/index/index" });
  }
  return (
    <View onClick={reConnect} className={className}>
      <View>
        <Image src={Connect} />
      </View>
      <View
        className="spot"
        style={{ background: connected ? "rgb(58,247,165)" : "rgb(247,58,58)" }}
      ></View>
      <Text>{connected ? "已连接" : "重试"}</Text>
    </View>
  );
}

export default connect(mapStateToProps)(ConnectState);
