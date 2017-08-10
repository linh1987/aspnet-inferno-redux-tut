require('babel-register')
require('isomorphic-fetch')
const InfernoServer = require('inferno-server');
const cheerio = require('cheerio');
const { initWidgetManager } = require('./widgets');

module.exports = function (callback, html) {
    const widgetManager = initWidgetManager(false);
    const $ = cheerio.load(html);

    if (!global.InfernoServer) {
        global.InfernoServer = InfernoServer;
    }

    widgetManager.renderServer((result) => callback(null, result), $);
};