var listing = require('../controllers/listing.controller.js');

module.exports = function(app) {
    app .route('/newListing')
        .get(listing.renderAddListing)
        .post(listing.create);
};
