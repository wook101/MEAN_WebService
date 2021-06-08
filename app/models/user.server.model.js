const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true   //email secondary 인덱스
    },
    username: {
        type: String,
        trim: true,
        unique: true //unique 인덱스
    },
    password: String,
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
    }
},
{collection:'user'});//collection명 설정 안해주면 defaul값이 users로 지정됨 

UserSchema.virtual('fullName').get(function(){  //fullName필드를 보여주고 싶을때 virtual메소드 사용
    return this.firstName+' '+this.lastName;
});
UserSchema.set('toJSON', {getters:true, virtuals:true});

mongoose.model('User', UserSchema);