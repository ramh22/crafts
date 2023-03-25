const mongoose=require('mongoose');
//const slugify=require('slugify');
const validator=require('validator');


const offerSchema=new mongoose.Scehma(
    {
     
    },{toJSON:{virtuals:true}},
{toObject:{virtuals:true}});
const Offer = mongoose.model('Offer',offerSchema);
module.exports =Offer; 