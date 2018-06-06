const path = require('path');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  // 入口
  entry: "",

  // 编译文件
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].js'
  },

  // 外部引用
  externals: {
    
  },

  // 模块
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'sass-loader',
        },
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: [
              'env',
              'react',
              'stage-0',
            ],
            plugins: [
              'react-hot-loader/babel',
              'transform-runtime',
              'transform-decorators-legacy',
              'syntax-dynamic-import'
            ],
          }
        }],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 4196,
              name: 'img/[name].[ext]?[hash:7]'
            }
          }
        ]
      },
    ]
  },

  // 解析
  resolve: {
    enforceExtension: false,        // 无需扩展名
    extensions: ['.jsx', '.json', '.js', '.scss', '.vue'],
  },

  devtool: 'source-map',
  
  // 插件
  plugins: [

    // 环境变量设置
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'prod': JSON.stringify(isProd),
    }),
    
    // HRM
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
  ],

  // 禁止性能提示
  performance: {
    hints: false,
  }
};

module.exports = config;