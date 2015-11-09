var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    geocoderProvider = 'google',
    httpAdapter = 'http',
    geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, geocodeOptions);

var geocodeOptions = {
    apiKey: 'AIzaSyAWLqOFW-ufGpnzvJCzlxOX_BLBHjxwfmE',
    formatter: null
};


var ListingSchema = new Schema({
    title: String,
    address: String,
    price: Number,
    lat: Number,
    lng: Number,
    photo: [String],
    beds: Number,
    baths: Number,
    squareFee: Number,
    garages: Number,
    expiration: Date,
    feature: String
});

ListingSchema.post('save', function(doc) {
    var toGeocode = doc.address,
    model = require('mongoose').model('Listing');

    geocoder.geocode(toGeocode, function(err, res) {
        console.log(res);
        if(err) {
            console.log('ERROR: listing.post: ' + err);
        } else if (!res[0]) {
            console.log('No response, form is likely not filled out on submit');
        } else {
            model.update({_id: doc._id}, {
                lat: res[0].latitude,
                lng: res[0].longitude,
                address: res[0].formattedAddress
            }, {}, function(err, doc){
                if(err) {
                    console.log('ERROR: listing.post.update: ' + err);
                }
            });
        }
    });
});

mongoose.model('Listing', ListingSchema);
