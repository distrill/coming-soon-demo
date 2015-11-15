var Listing = require('mongoose').model('Listing');

// ************************************************************************** //
//                         render functions                                   //
module.exports.renderNewListing = function(req, res, next) {
    res.render('newListing', {});
};

module.exports.renderSingleListing = function(req, res) {
    res.render('singleListing', {
        listing: req.listing
    });
};

// ************************************************************************** //
//                              CRUD                                          //
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
            res.render('index', {});
            console.log('new listing created');
        }
    });
};

// cr[U]d
module.exports.update = function(req, res) {
    if (req.session.passport.user) {
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
            liting.feature = req.body.feature;
            listing.address = req.body.addresss;
            // TODO check that this save will update the lat/lng from schema method
            // listing.photo = ?? handle this better

            // save listing object with updated data
            listing.save(function(err) {
                if (err) {
                    return res.status(400).send( {
                        message: getErrorMessage(err)
                    });
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
    } else {
        // no user
        console.log('user not logged in, not authorized to update');
        res.redirect('/');
    }
};


// ************************************************************************** //
//                           helper functions                                 //
exports.listingByID = function(req, res, next, id) {
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
