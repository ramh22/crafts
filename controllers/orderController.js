const Order= require('./../models/orderModel');
const Rating= require('./../models/ratingModel');
const User= require('./../models/userModel');
const Craft= require('./../models/craftModel');
const APIFeatures=require('./../public/apiFeatures');
const catchAsync=require('./../public/catchAsync');
const AppError=require('./../public/AppError');
// create order
// title , difficulty , description,craft
exports.createOrder=async(req,res,next)=>{
    try
    {
       const {title,orderDifficulty,description,photo,craft,user}=req.body;
       const craftFound=await Craft.find({name:craft,});
       if(!craftFound){
        return next(new AppError("craft does not exist",401));
       }
    const newOrder= await Order.create({
      craft,
      title,
      orderDifficulty,
      description,
      photo,
      user:req.userAuthId,
    });
    craftFound.orders.push(newOrder._id);//
    await craftFound.save();
    res.status(201).json({
            status:'success',
            data:{
                order:newOrder
            },
         });
   }
     catch(err){//400= bad request  
        res.status(400).json({
         status:'faild',
         message:'invalid data is sent'
          });
     }
    next();
}
// read all orders
exports.getAllOrders=async(req,res,next)=>{
    try{
    const orders= await Order.find();
    res.status(200).json(
        {
        status :'success',
         result:orders.length,
             data:
             {
                orders
             },
        });
    }
    catch(err){
        res.status(400).json({
        status:'faild',
        message: err 
    });
    }
    next();
    }
//call one order by id    
exports.getOrder=async(req,res,next)=>{
    try{
        //const id=req.params.id*1;
     const order= await Order.findById(req.params.id).populate("rating");
    if(!order){
        return next(new AppError('no order find with that id',404));
    }
    //     res.status(404).json({
    //              status:'fail',
    //             message:'invalid id '
    //            });}
        res.status(200).json({
                     status :'success',
                      data:
                     {
                          order
                     },
                     });
        }
        catch(err){
            res.status(400).json({
            status:'faild',
            message: err 
        });}
        next();
    }
// call all orders in a craft on the home bage of worker

exports.getAllordersofacraft = catchAsync (async (req, res, next)=> {
const features = new APIFeatures(Car.find(), req.query)
.filter()
.limitFields()
.sort()
.paginate();
const orders = await features.query;
const populated = await Order.populate(orders,
{path:"craft",
select: "name"});
const CraftOrders = populated.map((order)=>({
...order.toObject(),
craft: order.craft,
}));
const count = await Order.countDocuments();
//console,log(count);
res.status(200).json({
count,
results: CraftOrders
});
});

        //127.0.0.1:3000/api/orders/sort=craftName
      // const orderOfACraft=await Order.find(req.body.craftName);
/*
     //  exports.getAllCars = catchAsync (async (req, res, next)=>{ ay f
const features = new APIFeatures(Car.find(), req.query)
filter ()
limitFields()
•sortO
•paginate();
const cars = await features.query;
cost populatedCars = awalt Car.populate(cars,
path:
"driver"
select: "name"
cost modifiedCars = populatedCar
...car. toobject(),
driver: car.driver,
1)):
const count = await Car.countDocuments();
console,log(count);
res. status (200). json({
count,
results: modifiedCars
1):
       */
//update an order
exports.updateOrder=async(req,res,next)=>{
    try{
        const order= await Order.findByIdAndUpdate(req.params.id,req.body({
            new:true,
            runValidators:true,//validate the update operation agienest model's schema
        }));
        res.status(200).json({
            status :'success',
            data:{
                 order
                }
            });}
    catch(err){
        res.status(404).json({
                status:'fail',
                message:err
               });}
     next();
}
exports.deleteOrder=async(req,res,next)=>{
    
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(204).json({//204 the data no content
            status :'success',
            data:{
                order:null
                }
            });
        }
        catch(err){
        res.status(404).json({
                status:'fail',
                message:err
               });}
     next();
}
