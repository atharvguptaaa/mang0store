
async function getCart(req,res){
    try{
        const userId=req.user.id;
        const cart=await getCart(userId);
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
        await addProductToCart(userId,productId,quantity);
        res.json({message:'Product added to cart'});
    }
    catch(err){
        console.error("Error adding product to cart",err);
        res.status(500).json({error:'failed to add product to cart'})
        }
}

async function RemoveProductFromCart(req,res){
    try{
        const userId=req.user.id;
        const {productId}=req.params.productId;
        await RemoveProductFromCart(userId,productId);
        res.json({message:'Product removed from cart'});
    }
    catch(err){
        console.error("Error removing product from cart",err);
        res.status(500).json({error:'failed to remove product from cart'})
        }
}

async function updateCartItemQuantity(req,res){
    
}