const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},{timestamps : true})

// Static Signup Method
UserSchema.statics.signup = async function(email,password){
    // Validation
    if(!email || !password){
        throw Error('Pls fill all fields');
    }
    if(!validator.isEmail(email)){
        throw Error('Email Id not valid');
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong Enough');
    }
    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already Exists');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const user = await this.create({
        email : email , password : hash
    })
    return user;
}

module.exports = mongoose.model('user',UserSchema);