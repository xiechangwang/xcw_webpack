/* 
  loader1、下载对应的loader 2、使用
  plugins1、下载 2 、引入 3、使用
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
  entry:"./src/index.js",
   //输出文件地址
  output:{
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module:{
    rules:[
    ]
  },
  plugins:[
    //打包html插件------html-webpack-plugin
    //功能-插件会默认创建html、默认输出所有的js、css
    //需求-需要有结构的html
    new HtmlWebpackPlugin({
      template:'./src/index.html'
})
  ],
  mode:"development"
}