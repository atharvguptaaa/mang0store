const { CreateOrder, GetOrderById, GetOrdersForUser } = require("../services/orderService");


async function createOrder(req,res){
    try{
        const userId=req.user.id;
        const { shippingAddress,totalAmount } = req.body;
        const order=await CreateOrder(userId,shippingAddress,totalAmount,cartItems);
        res.status(201).json(order);
    }
    catch(err){
        console.error('Error creating order', err);
        res.status(500).json({ error: 'Failed to create order' });
    }
}

async function getOrderById(req,res){
    try{
        const orderId=req.params.orderId;
        const order=await GetOrderById(orderId);
        if(order){
            res.json(order);
        }
        else{
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch(err){
        console.error('Error fetching order', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

async function getOrdersForUser(req,res){
    try{
        const userId=req.user.id;
        const order=await GetOrdersForUser(userId);
        if(order){
            res.json(order);
        }
        else{
            res.status(404).json({ error: 'Order not found' });
        }
    }
    catch(err){
        console.error('Error fetching order', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersForUser,
  };