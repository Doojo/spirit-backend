import jwt from 'jsonwebtoken';
import { userOtp } from '../db/models/otp.model.js';
import { mailOptions, mailTransporter } from '../services/mail.transporter.js';

export const createJwtToken = (userDetails)=>{
    
    const token =  jwt.sign(userDetails, process.env.JWT_SECRET_KEY,{ expiresIn: '14d' });
    return token;
}
export const generateOTP = ()=>{
    return Math.floor(100000 + Math.random() * 900000).toString();
} 

export const createOTP = (email) => {

    try {
        //otp generation
        const otp = generateOTP();

        mailOptions.subject = "Email OTP verification "
        mailOptions.to = email
        mailOptions.html = `
        <div>
        <h1>From Spirit Team: </h1>
        <p> your otp is : ${otp}</p>
        </div>
        `

        mailTransporter.sendMail(mailOptions, async function (error, info) {
            if (error) {
                throw new Error("error while sending mail")
                return;

            } else {
                //creating userOtp in database
                await userOtp.create({ otp, email });
            }
        });


    } catch (error) {

        throw new Error(error)
    }
}