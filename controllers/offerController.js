const Offer=require('./../models/offersModel');
const Order= require('./../models/orderModel');
const User= require('./../models/userModel');
const APIFeatures=require('./../public/apiFeatures');
const catchAsync=require('./../public/catchAsync');
const AppError=require('./../public/AppError');
exports.createOffer=catchAsync(async(req,res,next)=>{
    const {myoffer,order}=req.body;
//1. Find the order
const { orderID } = req.params;
const orderFound = await Order.findById(orderID).populate("offers");//populate here for only offer per an order
if (!orderFound) {
  return next(
    new AppError("order Not Found",404));
}



 //create offer
 const offer = await Offer.create({
    myoffer,

    order: orderFound?._id,
    user: req.userAuthId,
  });
  //Push offer into order Found
  orderFound.offers.push(offer?._id);
  //resave
  await orderFound.save();
  res.status(201).json({
    success: true,
    message: "offer created successfully",
  });
});




//offerAccepted :true
//offerAccepted:false
/*const projectNotStartYet= await Offer.aggregate(
    [//deconstruct an array field in a document and create separate output documents for each item in the array
       // {$unwind:'$startDates'},
        {$match:{
            offerAccepted :true
        }},//tempelt string
    ]);*/
    // {
    //     $group:{
    //         _id:{$month:'$startDates'},
    //         numTourStarts:{$sum:1},
    //         tours:{$push:'$name'}
    //     }
    // },