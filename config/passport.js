//passport local 인증 환경 설정
const passport = require('passport');
const mongoose = require('mongoose');

module.exports = function(){
    const User = mongoose.model('User');
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
        User.findOne({
            _id: id
        },'-password -salt',(err,user)=>{
            done(err, user);    
        });
    });
    require('./strategies/local.js')();
    require('./strategies/facebook.js')();  //Facebook strategy환경 설정 로드
    require('./strategies/google.js')();
    require('./strategies/naver.js')();
};