const express = require('express');                 //express 서버
const morgan = require('morgan');                   //로거 미들웨어 제공
const compress = require('compression');            //응답body 압축 제공
const bodyParser = require('body-parser');          //요청 데이터를 처리할 수 있는 미들웨어 제공
const methodOverride = require('method-override');  

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


    app.set('views','./app/views'); //views경로에서 템플릿 찾음
    app.set('view engine','ejs');   //ejs파일로 설정


    require('../app/routes/route.js')(app);

    app.use(express.static('./public'));    //static 미들웨어 추가

    return app;
};
