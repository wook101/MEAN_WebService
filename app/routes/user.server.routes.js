const users = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/users')
        .post(users.create)
        .get(users.list);        //모든 document list들을 조회하는 모듈 라우트에 등록
};
