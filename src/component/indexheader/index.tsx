import { Image, Text, View } from "@tarojs/components";
import Logo from "../../../asset/logo.png";
import "./index.module.less";

export default function IndexHeader() {
  return (
    <View className="indexHeader">
      <View className="logo">
        <Image src={Logo} />
      </View>
      <View className="name">
        <Text>inexbot</Text>
      </View>
    </View>
  );
}
