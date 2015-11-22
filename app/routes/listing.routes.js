var listing = require('../controllers/listing.controller.js');

module.exports = function(app, passport) {
    app .route('/newListing')
        .get(isAdmin, listing.renderNewListing)
        .post(listing.create);

    app .route('/listing/:listingID')
        .get(listing.readOne);
        // .post(listing.delete);

    app .route('/listing/edit/:listingID')
        .get(isAdmin, listing.renderUpdateListing)
        .post(listing.update);

    app .route('/listing/delete/:listingID')
        .get(isAdmin, listing.delete);

    app .param('listingID', listing.listingByID);

    function isAdmin(req, res, next) {
        // if the user is admin-authenticated in session, carry on
        if (req.isAuthenticated()) {
            return next();
        }
        // otherwise fuck off
        res.redirect('/signin');
    }
};
