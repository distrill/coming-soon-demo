var listing = require('./listing.controller');
var Lead = require('mongoose').model('Lead');
var twilio = require('twilio')('AC3f3cb324788fd3bbc373eea92862a6aa', '7d258a0578b17d0123e5b532251bddd9');

module.exports.renderIndex = function(req, res) {
    listing.readAll(req, res);
};

module.exports.renderAdmin = function(req, res) {
   res.render('admin', {
       admin: req.isAuthenticated() ? true : false
   });
};

module.exports.renderSignup = function(req, res) {
    res.render('signup', {
        message: req.flash('signupMessage')
    });
};

module.exports.signup = function(req, res) {
    var query = Lead.where({email: req.body.email});
    query.findOne(function(err, lead) {
        if (err) {
            return console.log('ERROR: index controller, signup: ' + err);
        }
        if (lead) {
            req.flash(
                'signupMessage', 'That email is already taken.'
            );
        } else {
            var newLead = new Lead();
            newLead.name = req.body.name;
            newLead.email = req.body.email;
            newLead.phone = req.body.phone;
            newLead.save(function(err) {
                if (err) {
                    console.log('ERROR: index controller, signup, save: ' + err);
                    res.redirect('/');
                } else{
                   console.log('Succesfully saved: ' + newLead);
                   twilio.sendMessage({
                       to: '+12508642362',
                       from: '+17787601892',
                       body: req.body.name + ', ' + req.body.email
                   }, function(err, responseData) {
                       if (!err) {
                           console.log(responseData.from);
                           console.log(responseData.body);
                       }
                   });
                   res.redirect('/');
                }
            });
        }
    });
    // Lead.findOne( {
    //     'email' : username
    // }, function(err, admin) {
    //     if (err) {
    //         return done(err);
    //     }
    //     if (admin) {
    //         return done(null, false, req.flash(
    //             'signupMessage', 'That email is already taken.'
    //         ));
    //     } else {
    //         // if there is no admin with that username, create one
    //         var newAdmin = new Admin();
    //         // set the admin's credentials
    //         newAdmin.username = username;
    //         newAdmin.password = newAdmin.generateHash(password);
    //         // save the mah--f'ckah
    //         newAdmin.save(function(err) {
    //             if (err) {
    //                 throw err;
    //             }
    //             return done(null, newAdmin);
    //         });
    //     }
    // });
};
