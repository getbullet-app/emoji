// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")
const { withWOFF2 } = require("@bullet./emoji/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

module.exports = withWOFF2({
  ...config,
  watchFolders: [path.resolve(__dirname, ".."), __dirname],
})
