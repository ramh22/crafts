const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');

const reportScehma=new mongoose.Scehma(
    {
        type:Array,
        User: {
            type:mongoose.Schema.ObjectID,
            ref:'User',
            required:[true,'report must belong to a user']
        }

    });

reportScehma.index({user:1,user:1},{unique:true});
 const Report = mongoose.model('Report',reportScehma);
module.exports =Report;