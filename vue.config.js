const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,

    host: "127.0.0.1",
    open: true,
    hot: true,//自动保存
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'

        }
      }
    }
  },
})
