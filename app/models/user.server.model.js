const mongoose = require('mongoose');
const crypto = require('crypto'); //랜덤 스트링을 얻기위한 모듈 ex)f39bf14f62922b8c054e5781aaa806e4f5ad4a39
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,        //email secondary 인덱스, 보조 색인이 되어 email 과 관련된 질의를 할 경우 성능향상
        match: /.+\@.+\..+/ //이메일 정규표현식 패턴
    },
    username: {
        type: String,
        trim: true,
        unique: true,   //unique 인덱스 primary key와 같은 형식
        required: true  //document를 추가할 때 username필드를 꼭 포함해야 함
    },
    password: {
        type: String,
        validate:[
            function(password){
                return password.length >= 6;
            },
            '패스워드가 6자 이상 입력 되지않음.'  //return값이 false인 경우 다큐먼트를 저장하지 않고 에러 메시지를 콜백에 전달
        ]
    },
    salt:{              //암호 해시에 사용
        type: String
    },
    provider:{          //사용자 등록에 사용된 전략
        type: String,
        required: 'Provider is required'
    },
    providerId: String, //인증전략의 사용자 식별자를 나타냄
    providerData: {},   //나중에 OAuth 공급자로부터 검색한 사용자 객체를 저장하는데 사용
    created:{
        type: Date,
        default: Date.now
    },
    website:{
        type: String,
        get: function(url){
            if (!url){
                return url;
            }else{
                if (url.indexOf('http://')!==0 && url.indexOf('https://')!==0){
                    url = 'http://'+url;
                }
                return url
            }
        }
    },
    role:{
        type: String,
        enum: ["Admin","Owner","User"]  //3가지 role이외에 다른 스트링은 허용하지 않음
    }
},
{collection:'user'});//collection명 설정 안해주면 defaul값이 users로 지정됨 


UserSchema.virtual('fullName').get(function(){  //fullName필드를 보여주고 싶을때 virtual메소드 사용
    return this.firstName+' '+this.lastName;
});



//사용자의 암호 해싱을 처리하기 위한 pre미들웨어
UserSchema.pre('save',function(next){
    console.log("1",this.password);
    console.log(this.password);
    if (this.password){
        console.log("실행됨"); 
        this.salt = crypto.randomBytes(16).toString('base64'); //random암호 해싱을 생성해 salt에 저장
        this.password = this.hashPassword(this.password);   //hashPassword메소드를 이용하여 현재 비밀번호를 해싱된 비밀번호로 변경한다.
    }
    
    next();
});
//hashPassword메소드 정의, pasword + salt를 통해 해싱 비밀번호 생성, crypto모듈을 사용
UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password,this.salt,10000,64,'sha512').toString('base64');
};

//password문자열 인자를 받아 해싱한 후 사용자의 해싱된 암호화 비교
UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username,suffix,callback){
    var possibleUsername = username+(suffix || '');
    this.findOne({
        username: possibleUsername
    }, (err, user) =>{
        if (!err){
            if (!user){
                callback(possibleUsername);
            } else{
                return this.findUniqueUsername(username, (suffix || 0)+1, callback);
            }
        } else{
            callback(null);
        }
    }
    
    );
};


//post미들웨어를 이용한 로깅
UserSchema.post('save',function(next){
    console.log(this.username+"가 저장됬습니다.");
});


const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: Schema.ObjectId,
        ref: 'User'
    }
},
{collection:'post'});


UserSchema.set('toJSON', {getters:true, virtuals:true});

mongoose.model('User', UserSchema);
mongoose.model('Post', PostSchema);