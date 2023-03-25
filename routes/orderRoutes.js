const express=require('express');
const orderModel = require('./../models/orderModel');
const orderController=require('./../controllers/orderController');
const mongoose=require('mongoose');
const router=express.Router();

// router.param('id',(req,res,next,val)=>{
//       console.log(`order id =${val}`);
//       next();
// });
//check body then create
//router.post(orderController.checkBody,orderController.createOrder);
// router.param('/',(req,res,next)=>{
//       const {name,price}=req.body;
//       if(!req.body.name||!req.body.price){
//      return res.status(404).json({
//             status:'fialed'
//       })}
//       next();
// })
router.
route('/')
.get(orderController.getAllOrders)
.post(orderController.createOrder);

router.
route('/:id')
.get(orderController.getOneOrder)
.patch(orderController.updateOrder)
.delete(orderController.deleteOrder);
//router.get('/orders/:id',orderController.getOneOrder);
//router.get('/orders/:craft',orderController.getOrdersOfOneCraft);/
//router.post('/orders',orderController.createOrder);

// router.patch('/orders/:id',orderController.updateOrder);
// router.delete('/orders/:id',orderController.deleteOrder);


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