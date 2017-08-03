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

module.exports = function (callback) {
    var result = appRenderder.renderServer({ todos: [{id: 1, content: "asdasd", completed: false}] });;
    callback(null, result);
};