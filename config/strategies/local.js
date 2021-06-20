const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('mongoose').model('User');

module.exports = function(){
    passport.use(new LocalStrategy((username,password,done)=>{
        User.findOne({  //username(아이디로 조회해서 user객체를 얻어옴)
            username: username
        },(err, user)=>{
            if (err){
                return done(err);
            }
            
            if (!user){
                return done(null, false,{
                    message: '해당 아이디가 존재하지 않습니다.'
                });
            }

            if(!user.authenticate(password)){
              return done(null, false, {
                  message: '비밀번호가 일치하지 않습니다.'
              });  
            }
            
            return done(null, user);
        });
    }));
}
