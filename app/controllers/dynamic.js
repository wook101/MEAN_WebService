exports.render=function(req,res){
    res.render('dynamic',{date: Date()});
}