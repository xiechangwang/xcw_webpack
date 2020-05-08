const path=require('path');

module.exports={
  //入口文件地址
  entry:'./src/index.js',
  //输出文件地址
  output:{
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  //编译webpack无法识别的：less、scss、ts
  module:{
    rules:[
      //不同的资源配置不同的loader
      {
        test:/\.css$/,
        use:[
          {loader:'style-loader'},          
          {loader:'css-loader'}
        ]
      },
      {
        test:/\.less$/,
        use:[
          {loader:'style-loader'},          
          {loader:'css-loader'},
          //将less->css
          {loader:'less-loader'}
        ]
      }
    ]
  },
  //插件集合
  plugins:[

  ],
  //模式development、production
  mode: "development"
}