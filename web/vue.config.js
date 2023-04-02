const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,


  // 前端解决跨域时
  // devServer: {
  //   proxy: {
  //     '/dev': {
  //       target: 'http://localhost:3005',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/dev": ''
  //       }
  //     }
  //   }
  // }
})
