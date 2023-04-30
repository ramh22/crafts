const crypto=require('crypto');
const {promisify}=require('util');
const User=require('../models/userModel');
const catchAsync = require('./../public/catchAsync');
const AppError=require('./../public/AppError');
const jwt=require('jsonwebtoken');
const sendEmail=('./../public/sendEmail');
const signToken = (id) => {
    return jwt.sign({ id: newUser._id, },
        process.env.JWT_SECRET,
        process.env.JWT_EXPIRES_IN);
};
const createSendToken=(user,statusCode,res)=>{
    const token=signToken(user._id);
    /*const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        //secure:true;
        httpOnly: true
      };
      if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;//not display cookies to clients
    
      res.cookie('jwt', token, cookieOptions);
    */
      // Remove password from output
      //user.password = undefined;
    
    res.statusCode.json({
        status:'success',
        data:{
            user
        }
    });
}
exports.signup=catchAsync(async(req,res,next)=>{
    const newUser= await User.create({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        role:req.body.role,
        hasACraft:req.body.hasACraft,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        });

     createSendToken=(newUser,201,res); 
       
    // const token=signToken(newUser._id);
     // jwt.sign({ id:newUser._id,},
    //     process.env.JWT_SECRET,
    //     process.env.JWT_EXPIRES_IN)
// try{
//     res.status(201).json({
//         status:'success',
//         data:{
//             user:newUser
//         },
//      });
//     }
//  catch(err){//400= bad request  
//     res.status(400).json({
//      status:'faild',
//      message:'invalid data is sent'
//       });
//  }

});
exports.login=catchAsync(async(req,res,next)=>{
    const {email,password}= req.body;
    //1)check if email and password exist
        if(!email || !password){
           return next(new AppError('please provide email and password',400));
        }
    //2) check if user exist && password is correct
    const user=await User.findOne({email:email}).select('+password');
/*

*/
   // const correct= await user.correctPassword(password,user.password);
    if(!user || !(await user.correctPassword(password,user.password))){
           return next(new AppError('Incorrect email or password',401))}

        //     res.status(401).json({
        //    status:"faild",
        //     message:err
         
    //3)if everything ok send token to client

    createSendToken(user,200,res);
    // const token=signToken(user._id); 
    // res.status(200).json({
    //     status:'success',
    //     token
    // });
});
exports.protect=catchAsync(async(req,res,next)=>{
    //1- getting token and check of it's there
    let token;
    if(req.headers.authorization && req.headers.authorization.startWith('Bearer')){
        token=req.headers.authorization.split(' ',[1]);
    }
    if(!token){
        return next(
            new AppError('you are not logged in',401));
    }
    // 2- verfication token
    const decoded=await promisify(jwt.verify)(token,Process.env.jwt_SECRET);
    //3- check if user still exist
    const currentUser=await User.findById(decoded.id);
    if(!currentUser){
        return next(
            new AppError('the user belonging to this token does not exist.  ',401));
    }
 //4- check if user changed password after the token was issued
 if (currentUser.changedPasswordAfter(decoded.iat)){
    return next(
        new AppError(' user currently changed the password! ,please log in again. ',401));

 }   
});
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
    //role=['admin','client','worker']
    
    if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
};


/**
 * 
 * exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});
 */

exports.forgotPassword=async(req,res,next)=>
{
    //get user pased on POSTed email
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new AppError('wrong email address',404));
    }
//generate the random reset token
const resetToken=user.passwordResetToken();
 await user.save({validateBeforeSave:false});
// send new token to user's email 
const resetURL=`${req.protocol}://${req.get(
    'host'
    )}/api/users/resetPassword/${resetToken}`
const message=`forgot your password? login by this ${resetURL}./n if you don't forget your password ,please ignore `

await sendEmail({
  email:user.email,
  subject:'your reset token to you can login (valide for 10 mins)',
  message
});
try{
    res.status(201).json({
        status:'success',
        message:'token send to email'
    });
}
catch(err){//400= bad request  
    user.passwordResetToken=undefined;
    user.passwordResetExpires=undefined;
    await user.save({validateBeforeSave:false});

    return next(new AppError('error, try again later'),500);
    }}

exports.resetPassword=async(req,res,next)=>
    {
        //get user based on the token
        const hashedToken=crypto
        .createHash('sha256')
        .update('req.param.token')
        .digest('hex');
        const user=await User.findOne({
            passwordResetToken:hashedToken,
            passwordResetExpires:{$gt:Date.now()}
        });
        if(!user){
            return next(new AppError('token is invailde',400));
        }
        User.password=req.body.password;
        User.passwordConfirm=req.body.passwordConfirm;
        user.passwordResetToken=undefined;
        user.passwordResetExpires=undefined;
        await user.save();
     // update changedPasswordAt (date) for user  
    //the user login ,send JWT
    createSendToken(user,200,res);
       // const token=signToken(user._id);
    }


exports.updateMyPassword= catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');
  
    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
      return next(new AppError('Your current password is wrong.', 401));
    }
  
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!
  
    // 4) Log user in, send JWT
    createSendToken(user, 200, res);
  });


//     const user=await User.findById(req.body.id).select('+password');
//     const password =await user.find(req.body.password);
//     //2- check is posted current password is correct
//     if( !(await user.correctPassword(password,user.password))){
//         next(new AppError('incorrect password try again',401));
//     }
    
//     //3- if so ,update password
//   // const newPassword=await user.Update(req.body);
//     const newpassword= await User.findByIdAndUpdate(req.params.id,req.body({
//         new:true,
//         runValidators:true,//validate the update operation agienest model's schema
//     }));
//     res.status(200).json({
//         status :'success',
//         data:{
//              password
//             }
//         });

//     //4- the user login ,send JWT
//     createSendToken(user,200,res);
//     // const token=signToken(newUser._id);
// } );   
module.exports.sendEmail;