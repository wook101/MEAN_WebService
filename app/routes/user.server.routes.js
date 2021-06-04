const users = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/users')
        .post(users.create)
        .get(users.list);        //모든 document list들을 조회하는 모듈 라우트에 등록

    app.route('/users/:userId')
        .get(users.read);
    
    app.param('userId', users.userByID); //req.user객체를 채우기 위해 먼저 userById실행
    
};