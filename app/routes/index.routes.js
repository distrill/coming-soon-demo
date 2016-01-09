var index = require('../controllers/index.controller.js');

module.exports = function(app, passport) {
    app .route('/')
        .get(index.renderIndex);

    app .route('/admin')
        .get(isAdmin, index.renderAdmin);

    app .route('/signin')
        .get(function(req, res) {
            res.render('signin', {
                message: req.flash('loginMessage')
            });
        })
        .post(passport.authenticate('local-login', {
            successRedirect: '/admin',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app .route('/signup')
        .get(index.renderSignup)
        .post(index.signup);

    app .route('/logout')
        .get(function(req, res) {
            req.logout();
            res.redirect('/');
        });

    function isAdmin(req, res, next) {
        // if the user is admin-authenticated in session, carry on
        if (req.isAuthenticated()) {
            return next();
        }
        // otherwise fuck off
        res.redirect('/signin');
    }
};
