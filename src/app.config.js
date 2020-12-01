export default {
  pages: [
    "pages/index/index",
    "pages/connect/index",
    "pages/teach/index",
    "pages/program/index",
    "pages/monitor/index",
    "pages/setup/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#6190E8",
    navigationBarTitleText: "纳博特",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    color: "#666",
    selectedColor: "#3b8bff",
    backgroundColor: "#fafafa",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/teach/index",
        iconPath: "./assets/tab-bar/teach.png",
        selectedIconPath: "./assets/tab-bar/teachActived.png",
        text: "示教",
      },
      {
        pagePath: "pages/monitor/index",
        iconPath: "./assets/tab-bar/monitor.png",
        selectedIconPath: "./assets/tab-bar/monitorActived.png",
        text: "监控",
      },
      {
        pagePath: "pages/setup/index",
        iconPath: "./assets/tab-bar/setup.png",
        selectedIconPath: "./assets/tab-bar/setupActived.png",
        text: "设置",
      },
    ],
  },
  subPackages: [
    {
      root: "pages/monitor/monitorindex",
      name: "监控页面",
      pages: ["io", "position", "torque"],
    },
    {
      root: "pages/setup/setupindex",
      name: "设置页面",
      pages: ["about", "connect", "force", "safe"],
    },
    {
      root: "pages/teach/teachindex",
      name: "示教页面",
      pages: [
        "drag/index",
        "drag/playback/index",
        "jog/index",
        "drag/playback/backindex/index",
      ],
    },
    {
      root: "pages/program/running",
      name: "运行界面",
      pages: [
        "index",
      ],
    },
  ],
};
