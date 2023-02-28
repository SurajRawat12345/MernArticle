const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

// Function for token creation
const createToken = (_id) => {
    return jwt.sign({_id : _id}, process.env.SECRET ,{expiresIn:'3d'});
}

const loginUser = async(req,res) => {
    res.json({mssg : "Login User"});
}
const signupUser = async(req,res) => {
    //res.json({mssg : "Signup User"});
    const {email , password} = req.body;
    try{
        const user = await User.signup(email,password);
        const token = createToken(user._id)
        res.status(200).json({email , token});
    }
    catch(error){
        res.status(400).json({error : error.message});
    }
}

module.exports = {loginUser , signupUser};