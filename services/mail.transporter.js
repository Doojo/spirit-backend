import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

var mailOptions = {
    to:"",
    from:process.env.EMAIL,
    body:""
}

// mail transporter
const mailTransporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls:{
        rejectUnauthorized: false
    }
});

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

export {mailTransporter, mailOptions};