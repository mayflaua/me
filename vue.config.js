const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV ==='production'
  ? '/me/'
  : '/',
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
