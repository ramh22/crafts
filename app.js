const express = require('express');
const morgan = require('morgan');
const rateLimit=require('express-rate-limit');

const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./public/AppError');
const globalErrorHandler = require('./controllers/errorController');

const compression=require('compression');
//const orderController= require('./controllers/orderController');
const app=express();
   //body parser
app.use(express.urlencoded({extended:false}));
const orderRouter=require('./routes/orderRoutes');
const userRouter=require('./routes/userRoutes');
const ratingRouter=require('./routes/ratingRoutes');
const offerRouter=require('./routes/offerRoutes');
//set security HTTP headers,
app.use(helmet());
//Global middleware
if(process.env.NODE_ENV ==='development'){
    //app.use(morgan('dev'));//is just a very regular middleware function
//to use middlewares :so in the middle of the request and the response.
    app.use(morgan('dev')); //here is our login results print in terminal all results in postman
    }

// Limit requests from same api
//to prevent denial of service and also brute force attacks
const limiter = rateLimit({
    max: 500,// for test api we need many reqs
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
//app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

//app.use(express.json());



app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

app.use('api/v1/orders',orderRouter);
app.use('api/v1/users',userRouter);
app.use('api/v1/ratings',ratingRouter);
app.use('api/v1/offers',offerRouter);
// //controllers
// app.get('/api/v1/orders',orderController.getAllOrders);
// app.get('/api/v1/orders/:id',orderController.getOneOrder);
 //app.post('/api/v1/users/signup',authController.signup);

// app.patch('/api/v1/orders/:id',orderController.updateOrder);
// app.delete('/api/v1/orders/:id',orderController.deleteOrder);

// xss secure
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });
  
  app.use(globalErrorHandler);
module.exports=app;
