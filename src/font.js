const { Platform } = require("react-native")

module.exports.BulletMoji_400Regular = Platform.select({
  android: require("../font/BulletMoji_400Regular.ttf"),
  default: require("../font/BulletMoji_400Regular.woff2"),
})
