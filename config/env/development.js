const facebookInfo = require('../../config/facebookInfo.json');
const googleInfo = require('../../config/googleInfo.json');
const naverInfo = require('../../config/naverInfo.json');

module.exports = {
    //Development configuration options
    sessionSecret: 'developmentSessionSecret',  //sessionSecret속성추가
    db: 'mongodb://localhost/mean-book',
    facebook: facebookInfo,
    google: googleInfo,
    naver: naverInfo
};