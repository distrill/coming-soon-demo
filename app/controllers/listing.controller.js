var Listing = require('mongoose').model('Listing');

// ************************************************************************** //
//                         render functions                                   //
module.exports.renderNewListing = function(req, res, next) {
    res.render('newListing', {
        // never edit, but same view so we have to specify
        admin: req.isAuthenticated() ? true : false,
        edit: false,
        listing: {}
    });
};

module.exports.renderUpdateListing = function(req, res) {
    res.render('newListing', {
        // check if admin. this route should always (edit == true)
        // but same view so we have to specify
        admin: req.isAuthenticated() ? true : false,
        edit: true,
        listing: req.listing
    });
};

// ************************************************************************** //
//                                 CRUD                                       //
// [C]rud
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
            console.log('new listing created');
            res.redirect('/');
        }
    });
};

// c[R]ud (read one)
module.exports.readOne = function(req, res) {
    res.render('singleListing', {
        // check if admin, then set edit flag accordingly
        admin: req.isAuthenticated() ? true : false,
        listing: req.listing
    });
};

// c[R]ud (read all)
module.exports.readAll = function(req, res) {
    Listing.find({}).find(function(err, listingResults) {
       if (err) {
           console.log('ERROR: listing.controller: readAll(): ' + err);
       }  else {
           console.log(listingResults);
           res.render('index', {
               admin: req.admin ? true : false,
               listings: listingResults
           });
       }
    });
};

// cr[U]d
module.exports.update = function(req, res) {
    if (req.listing) {
        var listing = req.listing;

        // update listing object with data from request body
        listing.title = req.body.title;
        listing.price = req.body.price;
        listing.beds = req.body.beds;
        listing.baths = req.body.baths;
        listing.squareFeet = req.body.squareFeet;
        listing.garages = req.body.garages;
        listing.expiration = req.body.expiration;
        listing.feature = req.body.feature;
        listing.address = req.body.address;
        // TODO: listing photos, use multer etc

        // save listing object with updated data
        listing.save(function(err) {
            if (err) {
                console.log('ERROR: listing.controller.update: ' + err);
            } else {
                // successful object update
                console.log('object successfully updated');
                res.redirect('/');
            }
        });
    } else {
        // no listing object
        console.log('no listing object, nothing to update :(');
        res.redirect('/');
    }
};

module.exports.delete = function(req, res) {
    Listing.find( {
        _id: req.listing.id
    }).remove( function(err) {
       if (err) {
           console.log('ERROR: listing.controller.delete(): ' + err);
       } else {
           console.log('listing successfully removed');
           res.redirect('/');
       }
   });
};


// ************************************************************************** //
//                           helper functions                                 //
module.exports.listingByID = function(req, res, next, id) {
    Listing.findOne( {
        _id: id
    }, function(err, listing) {
        if (err) {
            return next(err);
        } else {
            req.listing = listing;
            next();
        }
    });
};
