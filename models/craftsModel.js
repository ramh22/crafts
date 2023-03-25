const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');
const Order=require('./orderModel');
//slug -> 'am-i-wrong-fallin-in-love-with-you'
const craftScehma=new mongoose.Scehma(
    {
    name:{
        type:String,
        required:[true,'a craft must have a name'],//validate,
        unique:true,
        trim:true,
         maxLength:[40,'less or equal 40 character'],
         minLength:[3,'more or equal 3 character'],
     
        },
    image:String,
    slug:String,
    workers:{
        name:{
            type:String,
            required:[true,'a worker must have a name'],
            maxLength:[40,'less or equal 40 character'],
            minLength:[3,'more or equal 3 character'],
            },
        phoneNumber:{
            type:String,
            required:[true,'a worker must have a phone number'],
            unique:true,
           },
        address:{String},
        ratingAvg:Number,
        craft:{
            type:mongoose.Schema.ObjectID,
            ref:'Craft',
            required:[true,'worker must belong to a craft']
            },
        photo:String,
        bio:String,

    },
    orders:{
        type:mongoose.Schema.ObjectID,
        ref:'Order',
        required:[true,'orders must belong to a craft'],
        }


    
},
    {toJSON:{virtuals:true}},
    {toObject:{virtuals:true}}
    );
    
    const Craft = mongoose.model('Craft',craftScehma);
module.exports =Craft; 