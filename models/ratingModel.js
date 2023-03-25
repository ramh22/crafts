const mongoose=require('mongoose');
//const slugify=require('slugify');
const validator=require('validator');


const ratingSchema = new mongoose.Scehma(
    {
        type:Number,
            default:0,
            min:1,
            max:5,
        order:{
            type:mongoose.Schema.ObjectID,
            ref:'Order',
            required:[true,'rating must belong to an order']
            }, 
    },
    {toJSON:{virtuals:true}},
    {toObject:{virtuals:true}}
    );
    ratingSchema.index({order:1,user:1},{unique:true});
const Rating = mongoose.model('Rating',ratingSchema);
module.exports =Rating; 