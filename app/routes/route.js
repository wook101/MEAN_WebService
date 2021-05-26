const home = require('../controllers/home');
const dynamic = require('../controllers/dynamic');

module.exports = function(app){
    app.get('/', home.render);

    app.get('/dynamic', dynamic.render);

};