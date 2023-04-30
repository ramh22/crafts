//import { Router } from 'express';
//const orderModel = require('./../models/orderModel');
const express= require('express');
//const orderModel = require('./../models/orderModel');
const orderController=require('./../controllers/orderController');
const authController=require('./../controllers/authController');
//const mongoose=require('mongoose');
const router=express.Router();
 
//router.route('/craftName').get(orderController.getAllordersofacraft);
router
.route('/:craftId')
.post(authController.protect,orderController.createOrder);
router
.route('/')
.get(authController.protect,orderController.getAllOrders);


router.
route('/:id')
.get(orderController.getOrder)
.patch(orderController.updateOrder)
.delete(
      authController.protect,
      authController.restrictTo('admin','client'),
      orderController.deleteOrder);


//'new articles/new '),{
      //  articl:new Article()}

// router.get('/edit/:id',async(res,req)=>{
//     const article=await Article.findById(req.params.id)
//     res.render('new articles/edit '),{
//         article: article}
// });
// //unique properties
// router.get('/:slug',async(req,res)=>{
//     // title:req.body.title, unique value
//     const article=await Article.findOne({
//         slug:req.params.slug});
//     if(article==null)res.redirect('/');

//     res.render('articles/show',{article});//view file 
// })
// //create new article
// router.post('/', async(req,res)=>
// {
//    req.article=new Article()
//    next()
//     },saveAndRedirect('new'));
//     router.put('/id:',(req,res)=>{

//     });
//  router.put('/:id',async(req,res,next)=>{
//     req.article=await Article.findById(req.params.id)
//     next()

//  },saveAndRedirect('edit'));   
//  router.delete('/id:',async(req,res)=>{
//     await Article.findByIdAndDelete(req.params.id);
//     res.redirect('/');
//     });
//  function saveAndRedirect(path){
//     return async(req,res)=>{
//     let article=req.article
//    // const article=new Article({ 
//         // {'title','description','markdown'}:req.body},
//             article.title=req.body.title
//             article.description=req.body.description
//             article.markdown=req.body.markdown
    
//         try{
//             article=await article.save();
//             res.redirect(`/articles/${ article.slug}`)//articles is the view folder
//         }
//             catch(err){
//                 res.render(`articles/${path}`,
//                 {
//                 article
//                 });
//             }
//         }}
module.exports=router;