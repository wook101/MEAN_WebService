const user = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/user').post(user.create);
};
