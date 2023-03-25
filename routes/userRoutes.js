const express=require('express');
const userModel = require('./../models/userModel');
const userController=require('./../controllers/userController');
const mongoose=require('mongoose');
const router=express.Router();

router.
route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router.
route('/:id')
.get(userController.getOneUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);