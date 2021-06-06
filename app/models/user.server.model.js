const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: {
        type: String,
        trim: true
    },
    password: String,
    created:{
        type: Date,
        default: Date.now
    }
},
{collection:'user'});//collection명 설정 안해주면 defaul값이 users로 지정됨 



mongoose.model('User',UserSchema);