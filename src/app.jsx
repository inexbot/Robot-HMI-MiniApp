import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";
// import dva from "./utils/dva";
// import models from "./models";
import dva from "./utils/dva";
import models from "./models";
import "./app.less";
import "taro-ui/dist/style/index.scss";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      "pages/index/index",
      "pages/connect/index",
      "pages/teach/index",
      "pages/program/index",
      "pages/monitor/index",
      "pages/setup/index"
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#6190E8",
      navigationBarTitleText: "纳博特",
      navigationBarTextStyle: "white"
    },
    tabBar: {
      color: "#666",
      selectedColor: "#b4282d",
      backgroundColor: "#fafafa",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/teach/index",
          iconPath: "./assets/tab-bar/teach.png",
          selectedIconPath: "./assets/tab-bar/teachActived.png",
          text: "示教"
        },
        {
          pagePath: "pages/program/index",
          iconPath: "./assets/tab-bar/program.png",
          selectedIconPath: "./assets/tab-bar/programActived.png",
          text: "程序"
        },
        {
          pagePath: "pages/monitor/index",
          iconPath: "./assets/tab-bar/monitor.png",
          selectedIconPath: "./assets/tab-bar/monitorActived.png",
          text: "监控"
        },
        {
          pagePath: "pages/setup/index",
          iconPath: "./assets/tab-bar/setup.png",
          selectedIconPath: "./assets/tab-bar/setupActived.png",
          text: "设置"
        }
      ]
    },
    subPackages: [
      {
        root: "pages/monitor/monitorindex",
        name: "监控页面",
        pages: ["io", "position", "torque"]
      },
      {
        root: "pages/setup/setupindex",
        name: "设置页面",
        pages: [
          "about",
          "cartesian",
          "connect",
          "dh",
          "force",
          "joint",
          "net",
          "safe",
          "slave"
        ]
      }
    ]
  };

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
