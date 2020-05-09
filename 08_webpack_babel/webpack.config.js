const {resolve} =require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
//压缩 css 插件：optimize-css-assets-webpack-plugin
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');


module.exports={
  entry:"./src/index.js",
  output:{
    filename:"build.js",
    path:resolve(__dirname,"build")
  },
  module:{
    rules:[
      /*
        js兼容性处理:babel-loader @babel/core @babel/preset-env
        1、js的基本兼容处理
           问题：只能转换基本语法，如promise不能转换
        2、全部js兼容性处理@babel/polyfill。  引入import '@babel/polyfill'
           问题：只需要解决部分兼容性问题
        3、按需加载的兼容---->core-js  
        ----------------注意：2和3只能二选一--------------------------------     
      */
      {
        test:/\.js$/,
        exclude: /(node_modules)/,
        loader:"babel-loader",
        options:{
          //预设：指示babel做怎么的兼容性处理
          presets: [
            [
            '@babel/preset-env'
            ,{
              useBuiltIns:"usage",
              //指定codejs版本
              corejs:{
                version:3
              },
              //指定兼容到浏览器的版本
              targets:{
                chrome:'60',
                firefox:'60',
                ie:'9',
                safari:'10'  
              }
            }
            ]
          ]
        }
      },

      /* 
      A:js语法检查:
      eslint-loader eslint
      只检查用户源代码，第三方的库是不检查的
      ##################################
      B:设置检查规则：
        1、airbnb规则--->npm i eslint eslint-config-airbnb-base eslint-plugin-import -D
        2、package.json中eslintConfig中设置~
        "eslintConfig":{
          "extends": "airbnb-base"
        } 
      */
     {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      options: {
        fix: true,  //自动更新格式
      },
    },
      {
        test:/\.css$/,
        use:[
          // "style-loader", //创建style标签，将样式放入
          MiniCssExtractPlugin.loader,  //这个loader取代style-loader，提取css成单独文件
          "css-loader",  //将css文件整合到js文件中
          /* 
          css 兼容处理：postcss--->postcss-loader postcss-preset-env
          帮postcss找到package.json中browserslist里面的配置。通过配置加载指定的css兼容样式
          "browserslist":{
            "development":[
              "last 1 chrome version",  最近一版的谷歌
              "last 1 firefox version",
              "last 1 safari version"
            ],
            "production":[
              ">0.2%",  大于0.2%浏览器
              "not dead", 
              "not op_mini all" 兼容有所浏览器
            ]
          }   
          */
         //使用：使用loader默认配置‘postcss-loader’
         //修改loader配置
         {
           loader:"postcss-loader",
            options:{ 
              ident:"postcss",
              plugins:()=>[
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      },
       {
         test:/\.less$/,
         use:[
          //  "style-loader",
          MiniCssExtractPlugin.loader,
           "css-loader",
           "less-loader"
          ]
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
            // [ext]取文件原来扩展名
            name:"[hash:10].[ext]"
        }
      },
      {
        test:/\.html$/,
        loader:"html-loader"
      },
      {
        //处理其他资源
        exclude:/\.(html|js|css|less|jpg|png|gif)$/,
        loader:"file-loader",
        options:{
          name:"[hash:10].[ext]"
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:"./src/index.html"
    }),
    //下载插件将css提取成单独文件
    //mini-css-extract-plugin
    new MiniCssExtractPlugin({
      filename:"css/[name].css"
    }),
    //压缩css
    new OptimizeCssAssetsWebpackPlugin()
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