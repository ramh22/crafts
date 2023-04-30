const Rating=require('./../models/ratingModel');
const Order=require('./../models/orderModel');

exports.createRating=vatchAsync(async(req,res,next)=>{
    const { order, rate } = req.body;
      //1. Find the product
  const { orderID } = req.params;
  const orderFound = await Order.findById(orderID).populate("rating");//rating from schema of order
  if (!orderFound) {
    throw new Error("order Not Found");
  }
   //check if user already put a reting this product before
   const hasRatinged = orderFound?.rating?.find((rating) => {
    return rating?.user?.toString() === req?.userAuthId?.toString();
  });
  if (hasReviewed) {
    throw new Error("You have already reviewed this product");
  }
     //create review
  const rates = await Rating.create({
    rate,
    order: orderFound?._id,
    user: req.userAuthId,
  });
    //resave
    await orderFound.save();
    res.status(201).json({
      success: true,
      message: "rating created successfully",
    });
  });
