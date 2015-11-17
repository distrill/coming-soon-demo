var index = require('../controllers/index.controller.js');

module.exports = function(app) {
    app .route('/')
        .get(index.renderIndex);

    app .route('/admin')
        .get(index.renderAdmin);
};
