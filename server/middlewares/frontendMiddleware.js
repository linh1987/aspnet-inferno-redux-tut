/* eslint-disable global-require */
const express = require('express');
const fsHandler = require('fs');

const path = require('path');
const compression = require('compression');

const appRenderder = require(path.resolve(process.cwd(), 'app/index.js'));

// Production middlewares
const addProdMiddlewares = (app, options, getServerEndpoint) => {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'dist');
  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.use(publicPath, express.static(outputPath, {index: false}));
  app.get('*', (req, res) => {
    fsHandler.readFile(path.join(outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        var renderedApp = appRenderder.renderServer({todos: []});
        var fileContent = file.toString();

        fileContent = fileContent.replace("<!--app-->", renderedApp);
        res.send(fileContent);
      }
    });
  });
    
};

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
    addProdMiddlewares(app, options);
};