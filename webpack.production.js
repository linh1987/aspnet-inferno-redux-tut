const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const webpack = require('webpack');

module.exports = webpackMerge(commonConfig, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        })
    ]
});