const passport = require('passport'); //passport모듈
//const url = require('url');
const FacebookStrategy = require('passport-facebook').Strategy; //Facebook전략 객체
const config = require('../config');
const users = require('../../app/controllers/user.server.controller');

module.exports = function(){
    //FacebookStrategy생성자의 두개의 인자 1.facebook 어플리케이션 정보, 2.사용자 인증시 호출할 callback함수
    passport.use(new FacebookStrategy({     //passport의 use메소드를 통해 facebook전략 등록
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id','displayName','emails','name'],
        passReqToCallback: true
    },(req, accessToken, refreshToken, profile, done)=>{
        const providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        const providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            //email: profile.emails[0].value,
            username: profile.name.givenName + profile.name.familyName,
            provider: 'facebook',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};