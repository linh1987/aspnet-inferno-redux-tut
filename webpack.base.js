
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
      'main': './app/app.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['es2015', {modules: false}]],
            plugins: ['syntax-dynamic-import', 'inferno']
          }
        }]
      }, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        }),
      }, {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      }, {
        test: /\.(png|jpg)$/,
        use: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },

  devtool: 'source-map',

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'wwwroot/dist'),
    publicPath: '/dist'
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'appscript.ejs',
      inject: true, 
      filename: path.resolve(__dirname, 'Views/Shared/_AppScript.cshtml'),
      chunks: ['main']
    }),
    new ExtractTextPlugin('styles.[hash].css')
  ]
};