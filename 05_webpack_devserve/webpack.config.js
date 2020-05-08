const {resolve} =require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports={
  entry:"./src/index.js",
  output:{
    filename:"build.js",
    path:resolve(__dirname,"build")
  },
  module:{
    rules:[
       {
         test:/\.less$/,
         use:["style-loader","css-loader","less-loader"]
       },
       {
        test:/\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载url-loader file-loader
        loader:"url-loader",
        options: {
            // 8 * 1024表示 图片大小小于8KB，就会被base64处理
            // 优点: 减少请求数量(减轻服务器压力)
            // 缺点: 图片体积会更大(文件请求熟读更慢)
            limit:  8 * 1024,
            // 问题:因为url-loader默认使用es6模块化解析,而html-loader引入图片是commonjs
            // 解析时会出问题:[object Module]
            // 解决:关闭url-loader的es6模块化，使用commonjs解析
            esModule:false,
            // 给图片进行重命名
            // [hash:10]取图片的hash的前10位
            // [text]取文件原来扩展名
            name:"[hash:10].[ext]"
        }
      },
      {
        test:/\.html$/,
        use:"html-loader"
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.html"
    })
  ],
  mode:"development",
  //开发服务器devServer,热更新.
  //特点：只会在内存中编译打包,不会有任何输出
  //启动devServer指令npx webpack-dev-server
  devServer:{
    contentBase:resolve(__dirname,"build"),
    //启动gzip压缩
    compress:true,
    //端口
    port:3030,
    //打开默认浏览器
    open:true
  }

}