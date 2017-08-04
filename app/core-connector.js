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
const app = require('./app.js');

const renderApp = (state, callback) => {
    if (state.todoLoaded) {
        const result = appRenderder.renderServer(state);

        callback(null, result);
    }
}

module.exports = function (callback) {
    const todoStore = app.todoStore;

    renderApp(todoStore.getState(), callback);

    todoStore.subscribe(() => {
        renderApp(todoStore.getState(), callback);
    })
};