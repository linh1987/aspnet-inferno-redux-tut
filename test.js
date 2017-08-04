var appConnector = require('./app/core-connector');

appConnector(function(err, data) {
    console.log(data);
});