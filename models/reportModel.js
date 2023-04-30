const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');

const reportSchema=new mongoose.Schema(
    {
        type:[String],
        
        createAt:{
            type:Date,
            defalte:Date.now,
        },
        owner: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:[true,'report must belong to a user']
        },
        reported: {
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:[true,'report must add to a user']
        }

    });

reportSchema.index({user:1,user:1},{unique:true});
 const Report = mongoose.model('Report',reportSchema);
module.exports =Report;