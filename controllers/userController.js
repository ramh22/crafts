const User=require('./../models/userModel');
const catchAsync = require('./../public/catchAsync');
const getTokenFromHeaders =require('./../public/getTokenFromHeaders');
const AppError=require('./../public/AppError');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};//many of elements in the array
    Object.keys(obj).forEach(el => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };
exports.getAllUsers=async(req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        status:'success',
        results:users.length,
        
        data:{users}
    });
next();
}
//update the currently authenticated user.
exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          'This route is not for password updates. Please use /updateMyPassword.',
          400
        )
      );
    }
  
    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');
  
    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });

  //mongodb+srv://RAMH:%3C96lw6LKMKdW8z7yU%3E@cluster0.rtuc7zn.mongodb.net/test
//delet your account
// we actually just set the account to inactive.
  exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  exports.getProfile=catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    const token=getTokenFromHeaders(req);
    res.json({
      status: "success",
      message: "User profile fetched successfully",
      user,
    });
  });


exports.getUser=(req,res,next)=>{


}
exports.createUser=(req,res,next)=>{

}
exports.updateUser=(req,res,next)=>{

}
exports.deleteUser=(req,res,next)=>{

}
