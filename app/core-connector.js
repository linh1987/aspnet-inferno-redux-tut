require('babel-polyfill');
const babelResolver = require('babel-resolver');
const path = require('path');
require('babel-register')({
    presets: [
        require.resolve('babel-preset-env'),
    ],
    ignore: /node_modules/,
    resolveModuleSource: babelResolver(__dirname, path.resolve(__dirname, '../app')),
});

const appRenderder = require('./index.js');

module.exports = function (callback, todos) {
    var result = appRenderder.renderServer(JSON.parse(todos));

    callback(null, result);
};