var user = require('../controllers/user.controller');

module.exports = function(app) {
    app .route('/login')
        .get(user.renderLogin);

    app .route('/signup')
        .get(user.renderSignup);
};
