const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();

const authRoutes=require('./routes/authRoutes.js');    
const productRoutes=require('./routes/productRoutes.js') 
const cartRoutes=require('./routes/cartRoutes.js')
const orderRoutes=require('./routes/orderRoutes.js')

const app=express();

app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}));
app.use(cookieParser());
app.use(express.json()); //for parsing json request bodies

app.use('/auth',authRoutes);//any request to a path starting with /auth should be handled by the routes defined in the authRoutes Router.
app.use('/product',productRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes); 

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server listening at port '+PORT);
});