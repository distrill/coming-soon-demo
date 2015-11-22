var LocalStrategy = require('passport-local').Strategy;
var Admin = require('mongoose').model('Admin');

module.exports = function(passport) {

    // PASSPORT SESSION SETUP (required by passport for persitent login)
    // serialize the admin for the session
    passport.serializeUser(function(admin, done) {
        done(null, admin.id);
    });

    // deserialize the admin
    passport.deserializeUser(function(id, done) {
        Admin.findById(id, function(err, admin) {
            done(err, admin);
        });
    });

    /***************************************************************************
     *                             LOCAL SIGNUP                                */
    passport.use('local-signup', new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        console.log('we are inside local-signup');
        process.nextTick(function() {
            Admin.findOne( {
                'local.username' : username
            }, function(err, admin) {
                if (err) {
                    return done(err);
                }
                if (admin) {
                    return done(null, false, req.flash(
                        'signupMessage', 'That email is already taken.'
                    ));
                } else {
                    // if there is no admin with that username, create one
                    var newAdmin = new Admin();
                    // set the admin's credentials
                    newAdmin.username = username;
                    newAdmin.password = newAdmin.generateHash(password);
                    // save the mah--f'ckah
                    newAdmin.save(function(err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, newAdmin);
                    });
                }
            });
        });
    }));
    /***************************************************************************
     *                             LOCAL LOGIN                                 */
    passport.use('local-login', new LocalStrategy( {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        Admin.findOne( {
            'username': username
        }, function(err, admin) {
            if (err) {
                return done(err);
            }
            if (!admin) {
                return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
            if (!admin.validPassword) {
                return done(null, false, req.flash('loginMessage', 'Wrong password.'));
            }

            return done(null, admin);
        });
    }));
};
