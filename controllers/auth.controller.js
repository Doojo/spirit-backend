import { User } from "../db/models/index.js";
import { ApiError, ApiResponse, asyncHandler, createJwtToken, createOTP, generateOTP, uploadOnCloudinary } from "../utils/index.js";
import dotenv from 'dotenv'
import { userOtp } from "../db/models/otp.model.js";
import { mailOptions, mailTransporter } from "../services/mail.transporter.js";
dotenv.config()



class Auth {
    async signUpStart(req, res) {

        const { mobile, email } = req.body;
        try {

            // Check if user already exists
            const existedUser = await User.findOne({
                $or: [{ email }, { mobile }]
            })
            console.log(existedUser);
            
            if (existedUser) {
                throw new ApiError(409, "User with email or mobile already exists");
                return;
            }

            const otp = await createOTP(email)
            res.status(201).send({ body: "otp generated to sign up" });

        } catch (error) {

            res.status(500).send(error.message);
        }

    }

    async signInStart(req, res) {

        const { email } = req.body;

        try {

            const userExists = await User.findOne({ email });
            if (!userExists) {
                throw new ApiError(409, "User not exists");
                return;
            }

            const otp = await createOTP(email);

            res.send("otp generated successfully");

        } catch (error) {

            res.status(401).send({msg:error.message});
        }

    }


    // verifinying the provided otp from db
    async verifyOTPAndSignIn(req, res) {

        const { otp, email } = req.body;
        try {

            const match = await userOtp.findOneAndDelete({ email, otp });
            if (!match) {
                res.status(405).send({
                    msg: "wrong otp entered",
                })
                return;
            }
            // Check if user already exists
            const existedUser = await User.findOne({
                email
            })

            const token = createJwtToken({ email });

            res.status(200).send({
                msg: "otp verified successfully",
                body: {
                    token,
                    user: existedUser
                }
            })



        } catch (error) {
            res.status(405).send({ msg: 'some error occured to verify otp', body: { otp, email, error } });

        }
    }

    async verifyOTPAndRegister(req, res) {

        const { otp, userDetails: { name, mobile, email, imgUrl } } = req.body;
        try {

            const match = await userOtp.findOneAndDelete({ email, otp });
            if (!match) {
                res.status(405).send({
                    msg: "wrong otp entered",
                })
                return;
            }

            const token =  createJwtToken({ email }); 
            const NewUser = await User.create({ email, verified: true, name, mobile, imgUrl });

            res.status(200).send({ 
                msg: "otp verified successfully", 
                body: {
                    token,
                    user: NewUser
                }
            })

        } catch (error) {
            res.status(405).send({ msg: 'some error occured to verify otp', body: { otp, email, error } });

        }
    }
}

export default Auth;
