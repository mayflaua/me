const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  productionSourceMap: false,
  filenameHashing: false,

  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       "@": path.resolve(__dirname, vueSrc)
  //     },
  //     extensions: ['.js', '.vue', '.json']
  //   }
  // }
})
