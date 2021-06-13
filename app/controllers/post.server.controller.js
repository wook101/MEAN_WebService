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
};

exports.list = function(req,res,next){

    Post.find().populate('author').exec((err,posts)=>{  //참조가 필요한 author이름을 넣어 exec메소드의 인자로부터 데이터를 받아옴
        if(err){
            return next(err);
        }else{
            res.status(200).json(posts)
        }
    });

};