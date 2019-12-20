//const agency  = require('./agency.js')
const webpack = require('webpack')

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'huwei/www',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    devServer:{
        proxy: {
            '/5ad6fee0d27d541368255cdb': {
                target: 'https://www.easy-mock.com/mock',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/5ad6fee0d27d541368255cdb': '/5ad6fee0d27d541368255cdb'
                }
            },
            '/5bcedeade67bcd5cf7f9701a': {
                target: 'https://www.easy-mock.com/mock',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/5bcedeade67bcd5cf7f9701a': '/5bcedeade67bcd5cf7f9701a'
                }
            },
            '/service':{
                target: 'http://1.09py.cn/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/service': '/service'
                }
            }
      },

      //host:"10.14.153.34",//要设置当前访问的ip 否则失效
      // host:"4.01936.com",
      //host:"10.14.153.10",
    },
    configureWebpack: {

      plugins: [

         new webpack.ProvidePlugin({

           $:"jquery",

           jQuery:"jquery",

           "windows.jQuery":"jquery"

         })

       ]

   }
  }