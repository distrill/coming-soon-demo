var Listing = require('mongoose').model('Listing');

module.exports.create = function(req, res, next) {
    console.log(req.body);
    var listing = new Listing(req.body),
        latitude = null,
        longitude = null;
    listing.save(function(err) {
        if(err) {
            console.log('ERROR: index.server.controller.create: ' + err);
            res.redirect('/');
        } else {
            res.render('index', {});
            console.log('new listing created');
        }
    });
};

module.exports.renderAddListing = function(req, res, next) {
    res.render('addListing', {});
};
