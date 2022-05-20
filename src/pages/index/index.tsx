import Taro from "@tarojs/taro";
import { Button, Input, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Tcp from "../../lib/tcp";
import "./index.less";
import { AtMessage } from "taro-ui";

const mapStateToProps = (state) => {
  return {
    connected: state.tcp.connected,
    error: state.tcp.errMsg,
  };
};

function Index(props) {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const tcp = Tcp.getInstance();
  useEffect(() => {
    if (props.connected) {
      Taro.redirectTo({ url: "/pages/teach/index" });
    }
    if (props.error) {
      console.error(props.error);
      Taro.atMessage({
        message: "连接失败，请检查控制器和手机是否在同一个局域网段！",
        type: "error",
      });
      setLoading(false);
      setDisabled(false);
    }
  }, [props.connected, props.error]);
  function connectTcp() {
    if (
      !ip.match(
        /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
      )
    ) {
      Taro.atMessage({
        message: "请输入正确的IP地址！",
        type: "error",
      });
      return;
    }
    tcp.connect(ip, 6020);
    setLoading(true);
    setDisabled(true);
  }

  return (
    <View className="loginPage">
      <AtMessage />
      <Input
        type="text"
        placeholder="IP地址,例:192.168.1.13"
        onInput={(e) => {
          setIp(e.detail.value);
        }}
        disabled={disabled}
        className="ip"
      />
      <Button
        onClick={connectTcp}
        loading={loading}
        disabled={disabled}
        className="submit"
      >
        提交
      </Button>
    </View>
  );
}
export default connect(mapStateToProps)(Index);
