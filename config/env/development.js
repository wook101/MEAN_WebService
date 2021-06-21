const facebookInfo = require('../../config/facebookInfo.json');
module.exports = {
    //Development configuration options
    sessionSecret: 'developmentSessionSecret',  //sessionSecret속성추가
    db: 'mongodb://localhost/mean-book',
    facebook: facebookInfo
};