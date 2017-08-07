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

//var appConnector = require('./app/core-connector');

//console.log(appConnector);
//appConnector(function (err, data) {
//    console.log(err);
//    console.log('..................')
//    console.log(data);
//}, "<html><head></head><body><div id=\"app\"></div></body></html>");



const { initWidgetManager } = require('./app/widgets');

const html = "<html><head></head><body><div id=\"app\"></div></body></html>"

const callback = (err, data) => {
    console.log(data);
}

const noop = () => { };

let widgetManager = initWidgetManager(false);

initWidgetManager(false).renderServer(noop, html);

initWidgetManager(false).renderServer(noop, html);
initWidgetManager(false).renderServer(noop, html);
initWidgetManager(false).renderServer(noop, html);
initWidgetManager(false).renderServer((result) => callback(null, result), html);
//widgetManager.renderServer((result) => callback(null, result), html);
