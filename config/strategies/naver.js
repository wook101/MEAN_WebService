const passport = require('passport'); //passport모듈
//const url = require('url');
const NaverStrategy = require('passport-naver').Strategy; 
const config = require('../config');
const users = require('../../app/controllers/user.server.controller');

module.exports = function(){
    passport.use(new NaverStrategy({     
        clientID: config.naver.clientID,
        clientSecret: config.naver.clientSecret,
        callbackURL: config.naver.callbackURL,
        passReqToCallback: true
    },(req, accessToken, refreshToken, profile, done)=>{
        const providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        console.log("profile",profile);

        
        const providerUserProfile = {
            //firstName: profile.name.givenName,
            //lastName: profile.name.familyName,
            //fullName: profile.displayName,
            email: profile.emails[0].value,
            //username: profile.displayName,
            provider: 'naver',
            providerId: profile.id,
            providerData: providerData
        };
        
        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};