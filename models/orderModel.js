const mongoose=require('mongoose');
const slugify=require('slugify');
const User=require('./../models/userModel');
const Craft=require('./../models/craftsModel');
const Rating=require('./../models/ratingModel');

// slug is a human-readable, unique identifier,
//  used to identify a resource instead of a less human-readable identifier like an id .
//   You use a slug when you want to refer to an item while preserving the ability to see, 
//   at a glance, what the item is. These identifiers are then used in the URL
 const validator=require('validator');
//const { populate } = require('./../models/offersModel');
 //order -> user 
 //order -> rating
 //order -> craft
const orderSchema=new mongoose.Schema({
    createDate:{
        type:Date,
        default:Date.now(),//timestamp
    },
    title:{
        type:String,
        required:[true,'an order must have a title'],//validate
        trim:true,
    },
    orderDifficulty:{
        type:String,
        required:[true,'an order must have a Difficulty']
    },
    description:{
        type:String,
        trim:true,
    },
    photo:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'order must belong to a user']
        },
    craft:{
            type:mongoose.Schema.ObjectId,
            ref:'Craft',
            required:[true,'order must belong to a craft']
            },    
    rating:{
        type:mongoose.Schema.ObjectId,
            ref:'Rating',
            
        },
    orderDone:{
        type:Boolean,
        default:false,
    },
    notDoneNotDeleteOrder:{
        type:Boolean,
        default:true,
        select:false,
    },
    //if length of the array of offers !=0 put orderHavingOffers===true 
    //every order with the same user_id + orderHavingOffers===true 
    orderHavingOffers:{
        type:Boolean,
        default:false,
        }, 
    offers:[
        {
            type:mongoose.Schema.ObjectId,
                ref:'Offer',
                
            },
    ],
    // type:Array,
    // validate:{
    //     validator:function (){
    //     if(!this.orderHavingOffers){

        },
 {
    timestamps: true,
  },
 {toJSON:{virtuals:true}},
{toObject:{virtuals:true}}
); 

orderSchema.virtual('User',{
    ref:'User',
    foreignField:'Order',//order
    localField:'_id'

});



orderSchema.virtual('Rating',{
    ref:'Rating',
    foreignField:'Order',
    localField:'_id'

});
orderSchema.virtual('crafts',{
    ref:'Crafts',
    foreignField:'Order',
    localField:'name'
});

const Order =  mongoose.model('Order',orderSchema);

//Order1.save().then(doc =>{console.log(doc)}).catch(err =>{console.log(err)});
module.exports =Order;