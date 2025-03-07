const express=require('express');
const { verifyToken } = require('../middlewares/authMiddlewares');
const { createOrder, getOrderById, getOrdersForUser } = require('../controllers/orderController');

const router=express.Router();

router.post('/',verifyToken,createOrder);
router.get('/:orderId',verifyToken,getOrderById);
router.get('/user',verifyToken,getOrdersForUser);


module.exports=router;

