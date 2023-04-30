/* eslint-disable import/no-unresolved */
const mongoose = require('mongoose');
const user=require('./../models/userModel');
const Order=require('./../models/orderModel');

//const slugify=require('slugify')
//const validator = require('validator');

const offerSchema = new mongoose.Schema(
  {
    myoffer:{
      type: String,
      required:[true,'please add the offer'],
    },  
    enum: ["accepted", "canceled"],
    createAt:{
    type:Date,
    default:Date.now,
    },
    offersOfNoReaction:Array,
    offersAccepted:Array,
    offersdone:Array,
     user:{
       type:mongoose.Schema.ObjectId,
       ref:'User',
       required:[true,'offer must belong to a worker']
       },  
       order:{
        type:mongoose.Schema.ObjectId,
        ref:'Order',
        required:[true,'offer must belong to a order']
        },  

  },
  { toJSON: { virtuals: true },
    timestamps:true,
 },
  { toObject: { virtuals: true } }
);

offerSchema.virtual('User',{
  ref:'User',
  foreignField:'Offer',
  localField:'_id'

});
offerSchema.virtual('Order',{
  ref:'Order',
  foreignField:'Offer',//order
  localField:'_id'

});
// eslint-disable-next-line prettier/prettier
const Offer = mongoose.model('Offer',offerSchema);
// eslint-disable-next-line prettier/prettier
module.exports =Offer; 