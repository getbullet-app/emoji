import { Platform } from "react-native"

export const bullet_moji = Platform.select({
  android: require("../font/bullet.moji.ttf"),
  default: require("../font/bullet.moji.woff2"),
})
