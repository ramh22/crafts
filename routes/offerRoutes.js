const express= require('express');

const offerController=require('./../controllers/offerController');
const authController=require('./../controllers/authController');
//const mongoose=require('mongoose');
const router=express.Router();
 
//router.route('/craftName').get(orderController.getAllordersofacraft);
router
.route('/:orderID')
.post(authController.protect,offerController.createOffer);






module.exports=router;







