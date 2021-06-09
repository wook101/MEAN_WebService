const mongoose = require('mongoose');
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
            '패스워드가 6자 이상 입력 되지않음.'
        ]
    },
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
UserSchema.set('toJSON', {getters:true, virtuals:true});

mongoose.model('User', UserSchema);