const Order= require('./../models/orderModel');


// exports.checkID=(req,res,next,val)=>
// {
//     console.log(`tour id is : ${val}`)
//     if(req.params.id*1>tours.length)
//     {
//         return res.status(404).json(
//             {
//             status:'fail',
//             message:'invalid id'
//             });
//     }
//     next();
// };
// how middleware works
// exports.checkBody=((req,res,next)=>{
//     console.log('name and price of post ');
//     if(!req.body.name || !req.body.price){
//         res.status(404).json({status:'fail',message:'no name or no price'});
//     }
//      next();
//  });
//create order
exports.createOrder=async(req,res,next)=>{
    const  newId= orders[orders.lenghth-1].id*1;
    //const newOrder=Object.assign({id : newId },req.body);
          orders.push(newOrder);
   const newOrder=new order.create({
    title:req.body.title,
    difficulty:req.body. difficulty,
    description:req.body.description,
    photo:req.body.photo,
   });
   try{
   const order =await order.save();
    res.status(201).json({
        status:'success',
            order: newOrder
         });//redirect(`/articles/${ article.slug}`)//articles is the view folder
    }
    catch(err){//400= bad request  
        res.status(400).json({
        status:'faild',
        message:err
         });
    }
    next();
}
// call all orders
exports.getAllOrders=async(req,res)=>{
    res.status(200).json(
        {
        status :'success',
        result:orders.length,
            data:
            {
                orders:'orders'
            },
        });
    }
//call one order by id    
exports.getOneOrder=async(req,res)=>{
    const id=req.params.id*1;
    const order=orders.find(el=>el.id===id);
    if(!order){
        res.status(404).json({
                 status:'fail',
                message:'invalid id '
               });}
        res.status(200).json({
                     status :'success',
                     data:
                     {
                         order
                     },
                     });
        }
// call all orders in a craft on the home bage of worker
exports.getOrdersOfOneCraft=async(req,res)=>{
    res.status(200).json(
                 {
                 status :'success',
                 result:orders.length,
                 data:
                 {
                     orders:'orders'
                 },
                 });
    }
//update an order
exports.updateOrder=async(req,res)=>{
    if(req.params.id*1> orders.length){
        res.status(404).json({
                status:'fail',
                message:' id not found so can not update'
               });}
        res.status(200).json({
                status :'success',
                data:{
                    tour:'update order here'
                    }
                });
}
exports.deleteOrder=async(req,res)=>{
    if(req.params.id*1> orders.length){
        res.status(404).json({
                status:'fail',
                message:' id not found so can not delete'
               });}
        res.status(204).json({//204 the data no content
                status :'success',
                data:{
                    tour:null
                    }
                });
}
