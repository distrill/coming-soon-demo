process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
    express = require('./config/express');

var db = mongoose(),
    app = express();

app.listen(8080, '127.0.0.1');

console.log('Coming Soon Homes running at http://localhost:8080/');
