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
})

export {mailTransporter, mailOptions};