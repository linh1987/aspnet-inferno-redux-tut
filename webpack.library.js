const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    entry: {
        'main': './app/app.js',
        'connector': './app/core-connector.js',
    },

    output: {
        library: 'connector',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'ssrscript.ejs',
            inject: false,
            filename: path.resolve(__dirname, 'Middlewares/SSRScriptPath.cs'),
            chunks: ['connector']
        }),
    ]
});