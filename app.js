const express = require('express');
const morgan = require('morgan');
const app=express();
//const orderController= require('./controllers/orderController');

const orderRouter=require('./routes/orderRoutes');
const userRouter=require('./routes/userRoutes');

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev')); //here is our login results print in terminal all results in postman
    }
//app.use(morgan('dev'));//is just a very regular middleware function
//to use middlewares :so in the middle of the request and the response.
app.use(express.json());

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
})
app.use('api/orders',orderRouter);
app.use('api/users',userRouter);

// //controllers
// app.get('/api/v1/orders',orderController.getAllOrders);
// app.get('/api/v1/orders/:id',orderController.getOneOrder);
// app.post('/api/v1/orders/:id',orderController.createOrder);

// app.patch('/api/v1/orders/:id',orderController.updateOrder);
// app.delete('/api/v1/orders/:id',orderController.deleteOrder);


module.exports=app;
