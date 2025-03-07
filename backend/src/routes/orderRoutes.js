const express=require('express');
const { verifyToken } = require('../middlewares/authMiddlewares');

const router=express.Router();

router.post('/',verifyToken,createOrder);
router.delete('/:orderId',verifyToken,getOrderById);
router.get('/user',verifyToken,getOrdersForUser);


module.exports=router;

