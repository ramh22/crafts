const crypto = require('crypto');
const mongoose = require('mongoose');
//const slugify = require('slugify');
const validator = require('validator');
const bcrypt=require('bcrypt');
const Craft = require('./../models/craftsModel');
//const { url } = require('inspector');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "an user must have a name"],
      trim: true,
    },
    email:{
      type:String,
      trim:true,
      required:[true,'user must have an email'],
      unique:true, 
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
  
    },
    
    photo:{
      type: String,
      //minLength:8,
    },
    role: {
      type: String,
      enum: ['client', 'worker', 'admin'],
      default: 'client',
    },
    address:{
      type:String,
      require:true,
      trim:true,
    },

      hasACraft:{
        type:String,
        required:[true,'  user has a craft name if he is a worker ?'],
        
        
        }
      ,
    // phoneNumber: {
    //   type: String,
         //unique:true,
    //   validate: {
    //     validator: function (num) {
    //       return String(num).length === 11 ;
    //     },
    //     message: " is not a valid phone number!",
    //   },
    //   required: [true, "User phone number required"],
    //   unique: true,
    // },
  /*
        const userSchema = new Schema({
  
});
const User = db.model('user', userSchema);
const user = new User();
let error;
error = user.validateSync();
assert.equal(error, null);
        */
  
  password: {
    type: String,
    required: [true, "please inter the password"],
    minLength: 12,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "please inter the password Confirm"],
    // remember that from the validator function return true or false
    validate: {
      // only work on create and save// not update
      validator: function (el) {
        return el === this.password;
         },
      message: "password is not the same",
    },
  },
 
  
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  myOfferSent:[
    {

    }
  ],
  myOrdersSent:[{
      //if length of the array of offers !=0 put orderHavingOffers===true 
    //every order with the same user_id + orderHavingOffers===true 
  
  }],
  myOrdersDone:[{

  }],
  reports:[{

  }]
  },
{timestamps:true,
  toJSON:{virtuals:true}
},

{
  toObject:{virtuals:true}
}
  
);

userSchema.pre('save',async function(next){
    //only run if password is modified
    if(!this.isModified(password)) return next();
    //hash the password
   this.password=await bcrypt.hash(this.password,12);
    //delete  passwordConfirm field and unsave in our database
   this.passwordConfirm=undefined;
   next();
});


userSchema.pre('save',function(next){
if(!this.isModified('password') || this.isNew) return next();
//that  will put the passwordChangedAt one second
this.passwordChangedAt=Date.now()-1000;
next();
});
// every query that starts with find, query middleware
userSchema.pre(/^find/,function(next){
    // this points to the current query
    this.find({active:{$ne:false}});
    next();
    });
// test password to login 
userSchema.methods.correctPassword=async function( 
  candidatePassword,//original passowrd from user
  userPassword)//user password hashed 
  {
      return await bcrypt.compare(candidatePassword,userPassword);
  };

  userSchema.methods.changedPasswordAfter=function(JTWTimestamp)
{
if(this.passwordChangedAt){
    const changedTimestamp=parseInt(
      //get Time obisete timeStamp
        this.passwordChangedAt.getTime()/1000,10);
    return JTWTimestamp<changedTimestamp;
}
//false mean not changed
return false
};

userSchema.methods.createPasswordResetToken=function(){
  const resetToken =crypto.randomBytes(32).toString('hex');
  this.passwordResetToken=Crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log({resetToken},this.passwordResetToken);
  // it has expired after 10 mins
  this.passwordResetExpires=Date.now()+10*60*1000;
  return resetToken;
}
const User = mongoose.model("User", userSchema);
module.exports = User;