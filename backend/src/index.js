const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser')
require('dotenv').config();

const authRoutes=require('./routes/authRoutes.js');    
const productRoutes=require('./routes/productRoutes.js') 

const app=express();

app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}));
app.use(cookieParser());
app.use(express.json()); //for parsing json request bodies

app.use('/auth',authRoutes);
app.use('/product',productRoutes) //any request to a path starting with /auth should be handled by the routes defined in the authRoutes Router.

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log('server listening at port '+PORT);
});