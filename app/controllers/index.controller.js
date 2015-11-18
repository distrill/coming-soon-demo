var listing = require('./listing.controller');

module.exports.renderIndex = function(req, res) {
    listing.readAll(req, res);
};

module.exports.renderAdmin = function(req, res) {
   res.render('admin', {});
};
