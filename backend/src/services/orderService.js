const { getXataClient } = require('../xata');
const xata = getXataClient();

async function CreateOrder(userId,shippingAddress,totalAmount,cartItems){
    const order=xata.db.orders.create({
      user_id: userId,
      order_date: new Date(),
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: 'pending', 
    })

    for (const cartItem of cartItems) {
        await xata.db.order_items.create({
          order_id: order.xata_id, // Use xata_id to link to the order
          product_id: cartItem['product_id.xata_id'], // Use xata_id from cartItem
          quantity: cartItem.quantity,
          item_price: cartItem['product_id.price'], // Price from cartItem
        });
      }

      return order;  
}

async function GetOrderById(orderId) {
    try {
      const order = await xata.db.orders
        .read(orderId)
        .select(['*', 'order_items.*', 'order_items.product_id.*', 'user_id.*']); // Include related data
      return order;
    } catch (err) {
      console.error('Error fetching order', err);
      throw err;
    }
  }
  
  async function GetOrdersForUser(userId) {
    try {
      const orders = await xata.db.orders
        .filter({ user_id: userId })
        .select(['*', 'order_items.*', 'order_items.product_id.*'])
        .getAll();
      return orders;
    } catch (err) {
      console.error('Error fetching orders', err);
      throw err;
    }
  }
  
  module.exports = {
    CreateOrder,
    GetOrderById,
    GetOrdersForUser,
  };