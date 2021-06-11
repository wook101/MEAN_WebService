const User = require('mongoose').model('User');
const Post = require('mongoose').model('Post');

exports.create = function(req, res, next){
    const data = req.body;
    const user = new User(req.body.author);

    user.save((err)=>{
        if (err){
            return next(err);
        }else{
            
        }
    });


    const post = new Post(data);
    post.author = user;


    post.save((err)=>{
        if (err){
            return next(err);
        }else{
            res.status(200).json(post);
        }
    });


}