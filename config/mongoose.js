var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/listing.model.js');
    require('../app/models/admin.model.js');

    return db;
};
