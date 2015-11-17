var Listing = require('mongoose').model('Listing');

module.exports.renderIndex = function(req, res) {
    Listing.find({}).find(function(err, listingResults) {
       if (err) {
           console.log('ERROR: listing.controller: readAll(): ' + err);
       }  else {
           console.log(listingResults);
           res.render('index', {
               listings: listingResults
           });
       }
   });
};

module.exports.renderAdmin = function(req, res) {
   res.render('admin', {});
};
