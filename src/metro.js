module.exports.withWOFF2 = function (config) {
  return {
    ...config,
    resolver: {
      ...config.resolver,
      assetExts: [...config.resolver.assetExts, "woff2"],
    },
  }
}
