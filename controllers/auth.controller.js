import { User } from "../db/models/index.js";
import { ApiError, ApiResponse, asyncHandler, createJwtToken, generateOTP, uploadOnCloudinary } from "../utils/index.js";
import twilio from 'twilio'
import dotenv from 'dotenv'
import { userOtp } from "../db/models/otp.model.js";
import { mailOptions, mailTransporter } from "../services/mail.transporter.js";
dotenv.config()


const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

class Auth {
    async createProfile(req, res) {

        const { name, mobile, email, imgData } = req.body;
        try {

            // Check if user already exists
            const existedUser = await User.findOne({
                $or: [ { email }]
            })

            if (existedUser) {
                throw new ApiError(409, "User with email or mobile already exists")
            }

            // handling image upload
            const avatarLocalPath = imgData?.path;

            const avatar = await uploadOnCloudinary(avatarLocalPath);


            // create user
            const user = await User.create({
                name,
                avatar: avatar ? avatar.url : "",
                email,
                mobile,
                isVerified: true,
                level: 1
            })

            const createdUser = await User.findById(user._id).select(" -refreshToken");
            // creating auth jwt token
            const token = createJwtToken(createdUser);

            res.status(201).send({ body: createdUser, token: token, message: "user created successfully" });

        } catch (error) {

            res.status(500).send(error.message);
        }

    }


    // creating otp with twilio and storing in db
    async createOTP(req, res) {

        const { email } = req.body;
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
                    res.status(402).send("error in sending email-otp");
                    
                } else {
                    //creating userOtp in database
                    await userOtp.create({ otp, email });
                    res.send({ msg: "otp sent successfully" })
                }
            });


        } catch (error) {
           
            res.status(402).send({
                msg: "error in sending otp to user"
            })
        }
    }

    // verifinying the provided otp from db
    async verifyOTP(req, res) {

        const { otp, email } = req.body;
        try {

            const match = await userOtp.findOneAndDelete({ email, otp });
            if (match) {

                
                res.status(200).send({
                    msg: "otp verified successfully",
                    body: match
                })

                return;
            }else{
   
                res.status(405).send({ msg: 'invalid otp or expired otp', body: { otp, email } });
            }
        } catch (error) {
            res.status(405).send({ msg: 'some error occured to verify otp', body: { otp, email, error } });

        }
    }
}

export default Auth;
