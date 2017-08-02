const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = webpackMerge(commonConfig, {});