const {AddProductToCart,RemoveProductFromCart,GetCart,UpdateCartItemQuantity}=require('../services/cartService')

async function getCart(req,res){
    try{
        const userId=req.user.id;
        const cart=await GetCart(userId);
        res.json(cart)
    }
    catch(err){
        console.error("Error getting cart",err);
        res.status(500).json({error:'failed to get cart'})
    }
}

async function addProductToCart(req,res){
    try{
        const userId=req.user.id;
        const {productId,quantity}=req.body;
        await AddProductToCart(userId,productId,quantity);
        res.json({message:'Product added to cart'});
    }
    catch(err){
        console.error("Error adding product to cart",err);
        res.status(500).json({error:'failed to add product to cart'})
        }
}

async function removeProductFromCart(req,res){
    try{
        const userId=req.user.id;
        const productId=req.params.productId;
        await RemoveProductFromCart(userId,productId);
        res.json({message:'Product removed from cart'});
    }
    catch(err){
        console.error("Error removing product from cart",err);
        res.status(500).json({error:'failed to remove product from cart'})
        }
}

async function updateCartItemQuantity(req,res){
    try{
        const userId=req.user.id;
        const productId=req.params.productId;
        const {quantity}=req.body;
        await UpdateCartItemQuantity(userId,productId,quantity);
        res.json({message:'Cart item quantity updated'});
    }
    catch(err){
        console.error("Error updating cart item quantity",err);
        res.status(500).json({error:'failed to update cart item quantity'})
        }
}

module.exports={
    addProductToCart,
    removeProductFromCart,
    getCart,
    updateCartItemQuantity,
}