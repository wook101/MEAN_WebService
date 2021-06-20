const User = require('mongoose').model('User');
const passport = require('passport');

//몽고db에 Collection에 user객체 정보 삽입
exports.create = function(req, res, next){
    const user = new User(req.body);

    user.save((err)=>{
        if (err){
            return next(err);
        }else{
            res.status(200).json(user);
        }
    });

}

//users컬렉션 내에 있는 모든 document들을 조회.
exports.list = function(req,res,next){
    User.find({},(err, users)=>{
        if (err){
            return next(err);
        }
        else{
            res.status(200).json(users);
        }
    });
}

//userByID메소드로 조회된 document가 req.user객체에 담겨 응답
exports.read = function(req,res){
    res.json(req.user);
};

//id을 통해 document조회
exports.userByID = function(req,res,next,id){
    User.findOne({
            _id: id
        },
        (err, user)=>{
            if (err){
                return next(err);
            }else{
                req.user=user;
                next();
            }
        }
    );

};

//document갱신
exports.update = function(req,res,next){
    User.findByIdAndUpdate(req.user.id, req.body, 
        {'new': true},
        (err,user)=>{
            if (err){
                return next(err);
            }else{
                res.status(200).json(user);
            }
        });

};

//document 삭제
exports.delete = function(req,res,next){
    req.user.remove(err =>{
        if (err){
            return next(err);
        }else{
            res.status(200).json(req.user);
        }
    })
}

//Mongoose 에러객체로부터 에러메시지를 반환
function getErrorMessage(err){
    let message = '';
    if (err.code){
        switch(err.code){
            case 11000:
            case 11001:
                message = '해당 아이디가 이미 존재합니다.'
                break;
            default:
                message = 'Something went wrong';
        }
    }else{
        for(var errName in err.errors){
            if (err.errors[errName].message)
                message = err.errors[errName].message;
        }
    }
    return message;
};

//로그인 페이지 render
exports.renderSignin = function(req, res, next){
    if (!req.user){
        res.render('signin',{
            title: 'Sign-in Form',
            messages: req.flash('error') || req.flash('info')
        });
    } else{
        return res.redirect('/');
    }
};

//회원가입 페이지 render
exports.renderSignup = function(req, res, next){
    if (!req.user){
        res.render('signup',{
            title:'Sign-up Form',
            messages: req.flash('error')
        });
    } else{
        return res.redirect('/');
    }
};

//회원가입, User모델을 사용해 새로운 사용자 생성
exports.signup = function(req,res,next){
    if (!req.user){
        const user = new User(req.body);
        user.provider = 'local';
        console.log(user);
        //유저를 mongoDB에 저장 후 성공하면 req.login메소드에 의해 사용자 세션이 생성됨
        user.save((err)=>{
            if (err){
                const message = getErrorMessage(err);
                req.flash('error', message);        //Connect-Flash모듈을 사용해 메시지 저장
                return res.redirect('/signup');
            }
            req.login(user, (err)=>{ //req.login() 메소드는 passport.authenticate() 메소드를 사용하면 자동으로 호출된다.
                if (err)
                    return next(err);
                return res.redirect('/');
            });
        });
    
    } else{
        return res.redirect('/');
    }

};

//로그아웃
exports.signout = function(req,res){
    req.logout();   //Passport 모듈에서 제공, 인증된 세션을 무효화
    res.redirect('/');
};