const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    
  },

  output: {
    path: path.resolve(process.cwd(), './dist'),
    filename: 'js/[name].js',
  },

  externals: {
    
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: false,
              }
            },
            'sass-loader',
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js[x]?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: [
              ['env', { "modules": false }],
              'babel-preset-react',
              'babel-preset-stage-0',
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
          },
        ]
      }
    ]
  },

  // 解析
  resolve: {
    alias: {
      
    },
    enforceExtension: false,        // 无需扩展名
    extensions: ['.jsx', '.json', '.js', '.scss', '.vue'],
  },

  devtool: 'cheap-source-map',

  plugins: [

    // 压缩
    new UglifyJSPlugin({
      parallel: true,       // 改善构建速度
      output: {
        comments: false,
        beautify: false,
      },
      compress: {
        drop_console: false
      },
      warnings: false
    }),

    // 提取css
    new ExtractTextPlugin('css/[name].css'),

    // 编译出错时 可以跳过输出阶段， 确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      title: 'React',
      filename: path.resolve(process.cwd(), './dist/index.html'),
      template: path.resolve(__dirname, './index.ejs'),
      inject: 'script'
    }),

    // 全局变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'prod': JSON.stringify(process.env.NODE_ENV)
    }),
  ],

  performance: {
    hints: 'warning'
  }
};