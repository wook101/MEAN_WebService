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

//userByID메소드로 조회된 document가 req.user객체에 담겨 응답
exports.read = function(req,res){
    res.json(req.user);
};

//id을 통해 document조회
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

//document갱신
exports.update = function(req,res,next){
    User.findByIdAndUpdate(req.user.id, req.body, 
        {'new': true},
        (err,user)=>{
            if (err){
                return next(err);
            }else{
                res.status(200).json(user);
            }
        });

};
