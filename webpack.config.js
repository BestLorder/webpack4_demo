const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') //引入html-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const ip = require('ip').address()
module.exports = {
  entry: {
    index: './src/index.js' //入口文件，若不配置webpack4将自动查找src目录下的index.js文件
  },
  output: {
    filename: '[name].bundle.js', //输出文件名，[name]表示入口文件js名
    path: path.join(__dirname, 'dist') //输出文件路径
  },
  module: {
    // 处理对应模块
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] //处理css
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/', //输出到images文件夹
              limit: 500 //是把小于500B的文件打成Base64的格式，写入JS
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 对应的插件
    new HtmlWebpackPlugin({
      //配置
      filename: 'index.html', //输出文件名
      template: './index.html' //以当前目录下的index.html文件为模板生成dist/index.html文件
    }),
    new CleanWebpackPlugin(), //传入数组,指定要删除的目录
    // 热更新，热更新不是刷新
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    //配置此静态文件服务器，可以用来预览打包后项目
    inline: true, //打包后加入一个websocket客户端
    hot: true, //热加载
    contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
    host: ip, //主机地址
    port: 9090, //端口号
    compress: true //开发服务器是否启动gzip等压缩
  }
}
