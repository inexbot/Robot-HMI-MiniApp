import Taro from "@tarojs/taro";
import { Component } from "react";
import { Provider } from "react-redux";
import "taro-ui/dist/style/index.scss";

import model from "./model";
import "./app.less";
import dva from "./lib/dva";

const dvaApp = dva.createApp({ initialState: {}, models: model });
const store = dvaApp.getStore();

class App extends Component {
  componentDidMount() {
    const updateManager = Taro.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });
    updateManager.onUpdateReady(function () {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否重启应用？",
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        },
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    });
  }
  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
