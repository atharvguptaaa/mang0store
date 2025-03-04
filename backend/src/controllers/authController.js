const axios=require('axios');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const {generateToken}=require('../utils/tokenUtils');
const { getXataClient } = require('../xata.js'); // CommonJS import

const xata = getXataClient();

exports.login=(req,res)=>{
    const authUrl=`${process.env.AUTH_ENDPOINT}?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=${process.env.SCOPES}&access_type=offline`;
    res.redirect(authUrl);
}

// handles the OAuth 2.0 callback after the user authorizes the application. exchanges code for token
exports.callback=async (req,res)=>{
    const code=req.query.code;
    
    try{
        const response=await axios.post(process.env.TOKEN_ENDPOINT,{
            code,
            client_id:process.env.CLIENT_ID,
            client_secret:process.env.CLIENT_SECRET,
            redirect_uri:process.env.REDIRECT_URI,
            grant_type:'authorization_code',
        });

        const {id_token, access_token}=response.data;
        
        const userInfo=await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
            headers: { Authorization: `Bearer ${access_token}` }
        });

         // 1. Check if user exists in Xata database by email
        let user = await xata.db.users.filter({ email: userInfo.data.email }).getFirst();
        console.log(user);
        // 2. If user doesn't exist, create a new user in Xata
        if (!user) {

            console.log('Creating user with:', {
                user_id: Math.floor(Date.now() / 1000),
                username: userInfo.data.given_name,
         /*        password_hash: null, */
                email: userInfo.data.email,
              });
        user = await xata.db.users.create({
            user_id: Math.floor(Date.now() / 1000),
            username: userInfo.data.given_name,
            password_hash: null,
            email: userInfo.data.email, 
        });
        console.log("now "+user);
        }

        // 3. Generate JWT with Xata user ID and other user info
        const userToken = generateToken({ id: user.xata_id, ...userInfo.data }); 



/*         const userToken=generateToken(userInfo.data);
 */
        res.cookie('token',userToken,{httpOnly:true});

        res.redirect(process.env.FRONTEND_URL);
    }
    catch(err){
        console.error('Error in OAuth callback:', err);
        res.status(500).send("Error during OAuth callback")
    }
};

//Clears user session.
exports.logout=(req,res)=>{
    
    res.clearCookie('token');
    res.json({ message: 'Logged Out' });
}

//Returns the authenticated user’s details.
exports.profile=(req,res)=>{

   // console.log(req.cookies);
    // console.log(req.user);
    res.json(req.user);
}
