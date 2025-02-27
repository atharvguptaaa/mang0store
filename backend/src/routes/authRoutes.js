const express=require('express');
const { login, callback, logout, profile } = require('../controllers/authController');
const {verifyToken}=require('../middlewares/authMiddlewares');

const router=express.Router();

router.get('/login',login);
router.get('/callback',callback);
router.get('/logout',logout);
router.get('/profile',verifyToken,profile);

module.exports=router;
