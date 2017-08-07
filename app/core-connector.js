require('babel-register')

const { initWidgetManager } = require('./widgets');

module.exports = function (callback, html) {
    const widgetManager = initWidgetManager(false);

    widgetManager.renderServer((result) => callback(null, result), html);
};