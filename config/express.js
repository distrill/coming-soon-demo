var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    reload = require('reload'),
    http = require('http'),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

module.exports = function() {
    var app = express();

    require('./passport')(passport);    // pass passport to config

    // set up application basics
    app.use(morgan('dev'));     // log every request to the console
    app.use(cookieParser());    // read cookies (needed for auth)
    app.use(bodyParser.urlencoded({
        extended: true          // get info from html forms
    }));
    app.use(bodyParser.json());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // required for passport
    app.use(session({
        secret: 'lookingglasswhiskey',
        saveUninitialized: true,
        resave: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());    // persistent login sessions
    app.use(flash());                // flash messages stored in session

    app.use(express.static('./public'));

    var server = http.createServer(app);

    require('../app/routes/index.routes.js')(app, passport);
    require('../app/routes/listing.routes.js')(app, passport);

    return server;
};
