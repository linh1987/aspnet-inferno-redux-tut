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

const express = require('express');
const resolve = require('path').resolve;
const app = express();
const setup = require('./middlewares/frontendMiddleware');
// If you need a backend, e.g. an API, add your custom backend-specific middleware here

//app.use('/api', createApiRouter(getServerEndpoint));
// In production we need to pass these values in instead of relying on webpack

setup(app, {
    outputPath: resolve(process.cwd(), 'dist'),
    publicPath: '/',
});
// get the intended port number, use port 3000 if not provided
const port = 3000;
// Start your app.
app.listen(port, (err) => {
    if (err) {
        return console.error(err.message);
    }

    console.log('App started at: http://localhost:3000')
});
