const mongoose=require('mongoose');
const dotenv=require('dotenv');
const express = require('express');
//const app=require('express');
const app=require('./app');
dotenv.config({pass :'./cconfig.env'});//read environment variable before start the app
// start the express app
//const connectDB = 
const localDB ="mongodb://localhost:27017/test";

const connectDB = async () => {
  await mongoose.connect( localDB,
     {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
}

connectDB();

//Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
});

//const DB=process.env.URI;
//to connect to the database

// mongoose.connect(DB,
//     {
//         useNewURLParser :true,
//         useUnifiedTopology :true,
    
//     });
//     const connection =mongoose.connection;
//     connection.on('error',()=>{
//         console.log('DB conecction failed')
//     });
//     connection.on('error',()=>{
//         console.log('DB conecction success');
//     });
    
   // .then(()=>console.log('DB conecction successful'));//we need to pass in our database conection string

// const db= require('./config.env').MongoURI;
 //const app=express();

// };
// mongoose.connect(db ,options ).then(() => {
//    console.log('db is Connection');
// });
// const db=process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.PASSWORD
// );
//to connect to the database
//mongoose.conect(db,(err)=>  err );
const port= process.env.PORT ||3000;
app.listen(port,()=>{
    console.log(`app on port : ${port}`);
});
// const PORT = 3000;
// const server = app.listen(PORT, () =>
//   console.log(`Server Connected to port ${PORT}`)
// );