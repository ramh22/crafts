const mongoose=require('mongoose');
const slugify=require('slugify');
const validator=require('validator');
const Order=require('./orderModel');

const userScehma=new mongoose.Scehma(
    {
    name:{
        type:String,
        required:[true,'an user must have a name'],
        trim:true
    },
    phoneNumber:{
        type:String,
        required:[true,'an user must have a phone number'],
        unique:true,
        

     //   validate:[validator.isEmail,'please inter valid email'],
    
   photo:{
    type:String,
    //minLength:8,
   },
   role:{
    type:String,
    enum:['client','worker','admin'],
    default:'client'
   },
   address:String,
   password:{
    type:String,
    required:[true,'please inter the password'],
    minLength:12,
    select:false
   },
   passwordConfirm:{
    type:String,
    required:[true,'please inter the password Confirm'],
    // remember that from the validator function return true or false
    validate:{
        // only work on create and save
        validator:function(el){
              return el===this.password;
    },
    message:'password is not the same'},
   },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        }
    
   
}});
const User = mongoose.model('User',userScehma);
module.exports =User;