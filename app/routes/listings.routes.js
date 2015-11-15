var listing = require('../controllers/listing.controller.js');

module.exports = function(app) {
    app .route('/newListing')
        .get(listing.renderNewListing)
        .post(listing.create);

    app .route('/singleListing/:listingID')
        .get(listing.renderSingleListing);

    app .param('listingID', listing.listingByID);
};
