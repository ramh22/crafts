const dotenv=require('dotenv');
const app = require('./app');
dotenv.config({pass :'./config.env'});//read environment variable before start the app
// start the express app

//console.log(app.get('env'));
//console.log(process.env);

const port= process.env.PORT ||3000 ;
app.listen(port,()=>{
    console.log(`app on port : ${port}`);
});