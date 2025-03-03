import { getXataClient } from '../xata.js'
const xata =getXataClient();

async function GetAllProducts(){
    try{
        const products= await xata.db.products.getAll();
        return products;
    }
    catch(err){
        console.error('Error fetching products', err);
        throw err;
    }
}

async function GetProductById(id){
    try{
        const product =await xata.db.products.read(id);
        return product;
    }
    catch(err){
        console.error('Error fetching product', err);
        throw err;
    }
}

export{
GetAllProducts,
GetProductById,
};