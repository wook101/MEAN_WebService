const User = require('mongoose').model('User');

//몽고db에 Collection에 user객체 정보 삽입
exports.create = function(req, res, next){
    const user = new User(req.body);

    user.save((err)=>{
        if (err){
            return next(err);
        }else{
            res.status(200).json(user);
        }
    })

}

//users컬렉션 내에 있는 모든 document들을 조회.
exports.list = function(req,res,next){
    User.find({},(err, users)=>{
        if (err){
            return next(err);
        }
        else{
            res.status(200).json(users);
        }
    });
}

exports.read = function(req,res){
    res.json(req.user);
};

exports.userByID = function(req,res,next,id){
    User.findOne({
            _id: id
        },
        (err, user)=>{
            if (err){
                return next(err);
            }else{
                req.user=user;
                next();
            }
        }
    );

};
