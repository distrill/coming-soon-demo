var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    reload = require('reload'),
    http = require('http');

module.exports = function() {
    var app = express();

    app.use(morgan('dev'));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use(express.static('./public'));

    var server = http.createServer(app);

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/listings.routes.js')(app);

    return server;
};
