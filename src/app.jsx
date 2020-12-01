import React, { Component } from "react";
import { Provider } from "react-redux";
// import Start from "./pages/index";
import dva from "./utils/dva";
import models from "./models";
import "./app.less";
import "taro-ui/dist/style/index.scss";
import { AtMessage } from "taro-ui";

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <AtMessage />
        {this.props.children}
      </Provider>
    );
  }
}

export default App;
