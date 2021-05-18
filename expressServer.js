const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('hello world');
});
app.get('/login',function(req,res){
    res.send('login please');
})
app.listen(3000,function(){
    console.log("Running Server");
});


module.exports = app; //Express 애플리케이션을 적재하고 테스트하기 위한 용도