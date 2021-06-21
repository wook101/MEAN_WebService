const config = require('./config');
const express = require('express');                 //express 서버
const morgan = require('morgan');                   //로거 미들웨어 제공
const compress = require('compression');            //응답body 압축 제공
const bodyParser = require('body-parser');          //요청 데이터를 처리할 수 있는 미들웨어 제공
const methodOverride = require('method-override');  
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');               //passport모듈

module.exports = function(){
    const app = express();

    if (process.env.NODE_ENV==='development'){
        app.use(morgan('dev'));
    }
    else if(process.env.NODE_ENV=='production'){
        app.use(compress());    
    }

    app.use(bodyParser.urlencoded({
        extended:true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());


    app.set('view engine','ejs');       //ejs템플릿 엔진 설정
    app.set('views','./app/views/ejs'); //해당경로에서 템플릿 찾음
    
    //app.set('view engine','jade');          //jade템플릿 엔진 설정
    //app.set('views','./app/views/jade');


    app.use(session({
        saveUninitialized:true,
        resave:true,
        secret:config.sessionSecret
    }));
    
    app.use(flash());               //로그인,회원가입에서 오류메시지를 저장하기 위해 사용
    app.use(passport.initialize()); //passport모듈을 구동시킴
    app.use(passport.session());    //Express세션을 이용하여 사용자 세션추적

    //require('../app/routes/route.js')(app);
    require('../app/routes/user.server.routes.js')(app);    //라우팅

    app.use(express.static('public'));    //static 미들웨어 추가


    app.locals.pretty=true;
    app.get('/template',function(req, res){
        res.render('temp',{time:Date(),
                            title:"타이틀입니다."});
    });


    return app;
};
