const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.generateToken=(userData)=>{
    return jwt.sign(userData,process.env.CLIENT_SECRET,{expiresIn:'1h'});
};