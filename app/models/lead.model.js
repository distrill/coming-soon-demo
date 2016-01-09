var mongoose = require('mongoose');

var leadSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

mongoose.model('Lead', leadSchema);
