const index = require('../controllers/index.server.controller');
const users = require('../controllers/user.server.controller');
const posts = require('../controllers/post.server.controller');
const passport = require('passport');

module.exports = function(app){
    app.route('/')
        .get(index.render);

    app.route('/users')
        .post(users.create)
        .get(users.list);        //모든 document list들을 조회하는 모듈 라우트에 등록

    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('userId', users.userByID); //req.user객체를 채우기 위해 먼저 userById실행
    
    app.route('/posts')
        .post(posts.create)
        .get(posts.list);
    
    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local',{
            successRedirect:'/',
            failureRedirect:'/signin',
            failureFlash: true
        }));
    
    app.get('/signout', users.signout);


    //소셜 로그인 페이스북,구글,네이버
    app.get('/oauth/facebook', passport.authenticate('facebook',{ scope: 'email'})); //페이스북으 ㄴ기본적으로 email을 제공하지않음 그래서 scope에 이메일 추가,사용자 인증절차 시작
    app.get('/oauth/facebook/callback', passport.authenticate('facebook',{            //Facebook profile을 링크하면 인증절차 종료
        failureRedirect: '/signin',
        successRedirect: '/'
    }));


    app.get('/oauth/google', passport.authenticate('google',
            { failureRedirect: '/signin',
              scope: ['https://www.googleapis.com/auth/userinfo.profile',
                      'https://www.googleapis.com/auth/userinfo.email']}));  
    app.get('/oauth/google/callback', passport.authenticate('google',{    
        failureRedirect: '/signin',
        successRedirect: '/'
    }));


    app.get('/oauth/naver', passport.authenticate('naver'));

    app.get('/oauth/naver/callback', passport.authenticate('naver',{    
        failureRedirect: '/signin',
        successRedirect: '/'
    }));



};
