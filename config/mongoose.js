const config = require('./config');
const mongoose = require('mongoose');

module.exports = function(){
    //몽고 디비 최신버전 사용시 새로운 파서를 사용하라는 요구메시지가 안뜨게 설정 {useNewUrlParser:true}  
    const db = mongoose.connect(config.db,{useNewUrlParser:true,
                                            useUnifiedTopology:true});
    
    require('../app/models/user.server.model');

    return db;
};