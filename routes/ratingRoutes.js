const express= require('express');
//const orderModel = require('./../models/orderModel');
const ratingController=require('./../controllers/ratingController');
const authController=require('./../controllers/authController');
//const mongoose=require('mongoose');
const router=express.Router();
 
router.post('/:orderID',authController.protect,ratingController.createRating);
module.exports=router;