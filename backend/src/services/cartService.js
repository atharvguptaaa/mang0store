const {getXataClient} =require('../xata');
const xata=getXataClient();

async function AddProductToCart(userId,productId,quantity){
    try{
        await xata.db.cart.createOrUpdate(userId,{
            userId:userId,
            productId:productId,
            quantity:quantity
        })
    }
    catch(err){
        console.error('Error adding product to cart', err);
        throw err;
    }
}

async function RemoveProductFromCart(userId,productId){
    try{
        await xata.db.cart.delete({ user_id: userId, product_id: productId });
    }
    catch(err){
        console.error('Error removing product to cart', err);
        throw err;
    }
}

async function GetCart(userId){
    try {
        const cartItems = await xata.db.carts
          .filter({ user_id: userId })
          .select(['*', 'product_id.*']) // Include product details
          .getAll();
        return cartItems;
      } catch (err) {
        console.error('Error getting cart', err);
        throw err;
      }
}

async function UpdateCartItemQuantity(userId,productId,quantity){
    try{
        const existingCartItem=await xata.db.cart.filter({user_id: userId, product_id: productId}).getFirst();
        if(existingCartItem){
            existingCartItem.update({quantity:quantity})
        }
        else{
            throw new Error('Cart item not found');
        }
    }
    catch(err){
        console.error('Error updating product quantity', err);
        throw err;
    }
}

module.exports = {
    AddProductToCart,
    RemoveProductFromCart,
    GetCart,
    UpdateCartItemQuantity,
  };