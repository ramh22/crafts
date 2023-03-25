const mongoose=require('mongoose');
const slugify=require('slugify');


// slug is a human-readable, unique identifier,
//  used to identify a resource instead of a less human-readable identifier like an id .
//   You use a slug when you want to refer to an item while preserving the ability to see, 
//   at a glance, what the item is. These identifiers are then used in the URL
// const validator=require('validator');
const orderSchema=new mongoose.Schema({
    createAt:{
        type:Date,
        default:Date.now(),
    },
    title:{
        type:String,
        required:[true,'an order must have a title'],
        trim:true,
    },
    orderDifficulty:[String],

    description:{
        type:[String],
        trim:true,
    },
    photo:[String],
    user:{
        type:mongoose.Schema.ObjectID,
        ref:'User',
        required:[true,'order must belong to a user']
        },
    craft:{
            type:mongoose.Schema.ObjectID,
            ref:'Craft',
            required:[true,'order must belong to a craft']
            },    
    rating:{
        type:mongoose.Schema.ObjectID,
            ref:'Rating',
            required:[true,'rating must belong to a order']
            
        },
    orderDone:{
        type:Boolean,
        default:false,
    },
    active:{
        type:Boolean,
        default:true,
        select:false,
    },
    orderHavingOffers:{
        type:Boolean,
        default:false,
    }
},
 {toJSON:{virtuals:true}},
{toObject:{virtuals:true}}
);
orderSchema.virtual('rating',{
    ref:'Rating',
    foreignField:'Order',
    localField:'_id'

});
const Order = mongoose.model('Order',orderSchema);
module.exports =Order; 