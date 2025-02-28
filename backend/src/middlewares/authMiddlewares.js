const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken=(req,res,next)=>{
    const token=req.cookies?.token;
    console.log(token);
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified =jwt.verify(token, process.env.CLIENT_SECRET);
        req.user=verified;
        next();
    }
    catch(err){
        res.status(400).send('Invalid Token');
    }
}