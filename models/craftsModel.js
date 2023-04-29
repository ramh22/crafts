const mongoose = require('mongoose');
const slugify=require('slugify');
//const validator=require('validator');
const Order=require('./../models/orderModel');
const User=require('./../models/userModel');

const craftSchema=new mongoose.Schema(
    {
    name:{
        type:String,
        required:[true,'a craft must have a name'],//validate,
        unique:true,
        trim:true,
         maxLength:[40,'less or equal 40 character'],
         minLength:[3,'more or equal 3 character'],
     
        },
    image: {
          type: String,
          required: true,
        },
    slug:String,
    workers:Array,
    orders:Array,
    // workers:{
    //     name:{
    //         type:String,
    //         required:[true,'a worker must have a name'],
    //         maxLength:[40,'less or equal 40 character'],
    //         minLength:[3,'more or equal 3 character'],
    //         },
    //     phoneNumber:{
    //         type:String,
    //         required:[true,'a worker must have a phone number'],
    //         unique:true,
    //        },
    //     address:{String},
    
    //     photo:String,
    

    // },
    
  },
    {toJSON:{virtuals:true}},
    {toObject:{virtuals:true}}
    );
    const Craft = mongoose.model('Craft',craftSchema);
module.exports =Craft; 