import React, { Component } from "react";
import { View } from "@tarojs/components";
import ProjectIndex from "./project";
import Header from "../../component/header";
import "./index.less";

class Program extends Component {
  render() {
    return (
      <View className="index">
        <Header />
        <ProjectIndex />
      </View>
    );
  }
}

export default Program;
