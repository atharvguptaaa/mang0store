const express=require('express');
const { verifyToken } = require('../middlewares/authMiddlewares');

const router=express.Router();

router.post('/add',verifyToken,addProductToCart);
router.delete('/remove/:productId',verifyToken,RemoveProductFromCart);
router.get('/',verifyToken,getCart);
router.put('/update/:productId',verifyToken,updateCartItemQuantity);

module.exports=router;

