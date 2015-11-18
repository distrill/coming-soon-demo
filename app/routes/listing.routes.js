var listing = require('../controllers/listing.controller.js');

module.exports = function(app) {
    app .route('/newListing')
        .get(listing.renderNewListing)
        .post(listing.create);

    app .route('/listing/:listingID')
        .get(listing.readOne);
        // .post(listing.delete);

    app .route('/listing/edit/:listingID')
        .get(listing.renderUpdateListing)
        .post(listing.update);

    app .route('/listing/delete/:listingID')
        .get(listing.delete);

    app .param('listingID', listing.listingByID);
};
