# MiniApp

## 介绍

专用于协作机器人的小程序。
开发Blog在此。一些说明后面也会详细写。
[点击这里](https://inexbot.github.io/Robot-HMI-MiniApp)

### 软件架构

#### 当前已应用

NodeJs,React,[Taro@3.0.10](https://taro.jd.com/),[Taro UI 3.0.0](https://taro-ui.jd.com/),[Dvajs](https://dvajs.com/)

### 使用

设计分辨率：手机

1. 下载NodeJs，下载地址[Nodejs](http://nodejs.cn/)；
2. 推荐使用IDE：VSCode，下载地址[Visual Studio Code](https://code.visualstudio.com/)，原因：免费，轻量级，丰富扩展。

打开项目方法：

1. 安装NodeJs、VSCode；
2. git下载`git clone https://github.com/inexbot/Robot-HMI-MiniApp.git`使用ssh方式需在github加入自己的公钥。
3. 进入项目主目录；
4. 右键，选择Visual Studio Code打开。

#### 安装教程

##### 推荐yarn

推荐使用yarn来安装依赖！

1. 全局安装yarn`npm install yarn@latest -g`;
2. 全局安装Taro Cli 3.0.0`yarn global add @taro/cli@3.0.0`;
3. 安装依赖`yarn`.

##### 使用npm

1. 全局安装Taro Cli 3.0.0`npm install @taro/cli@3.0.0`;
2. 在主目录内通过终端执行`npm install`来安装所需依赖；
3. 执行`npm start`或`npm run start`，在localhost:3000即可预览；
4. 执行`npm build`或`npm run build`，编译程序。

#### 脚本

+ build:weapp 构建微信小程序
+ build:alipay 构建阿里小程序
+ build:h5 构建h5页面
+ build:rn 构建react native程序
+ build:qq 构建qq小程序
+ dev:weapp 调试微信小程序
+ dev:alipay 调试阿里小程序
+ dev:h5 调试h5页面
+ dev:rn 调试react native程序
+ dev:qq 调试qq小程序

##### VSCode直接执行

在VSCode左侧的自带脚本中，直接点击对应的箭头即可直接运行。

### 目录说明

### 下一步工作
