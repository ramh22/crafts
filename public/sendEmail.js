const nodemailer=require('nodemailer');//  mailtrap  

const sendEmail=async options=>{
    //
    const transporter= nodemailer.createTransport({
       port:process.env.EMAIL_PORT,
       host:process.env.EMAIL_HOST ,                                              
       auth:                                                        
        {          
            user: process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD,
        },
    });                        
              //define the email options                                              
    const emailOptions={                              
            from:'fack email <hhh@hello.io>' ,
            to: options.email,                  
            subject: options.subject,     
            text: options.message};    
        };
        //actually send the email
    await transporter.sendAll(mailOptions);             
   module.exports=sendEmail;