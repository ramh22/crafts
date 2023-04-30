const express =require('express');
const Router =express();
const craftController=require('../controllers/craftController');
const authController=require('../controllers/authController');
const router=Router();
router
.route('/')
.get(craftController.getAllCrafts)
.post(craftController.createCraft);
router
.route('/:id')
.get(craftController.getCraft)
.patch(craftController.updateCraft)
.delete(authController.product//first check if a user is actually logged in, okay?
    ,authController.restrictTo('admin'),//some user roles which will be authorized to interact with this resource.
    craftController.deleteraft);

module.exports=router;