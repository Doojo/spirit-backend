import { User } from "../db/models/index.js";
import { ApiError, ApiResponse, asyncHandler, createJwtToken, generateOTP, uploadOnCloudinary } from "../utils/index.js";
import twilio from 'twilio'
import dotenv from 'dotenv'
import { userOtp } from "../db/models/otp.model.js";
dotenv.config()


const twilioClient = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

class Auth {
    async register(req, res) {

        const { userName, fullName, mobile, email, imgData } = req.body;
        try {

            // Check if user already exists
            const existedUser = await User.findOne({
                $or: [{ userName }, { email }]
            })

            if (existedUser) {
                throw new ApiError(409, "User with email or username already exists")
            }

            // handling image upload
            const avatarLocalPath = imgData?.path;

            const avatar = await uploadOnCloudinary(avatarLocalPath);


            // create user
            const user = await User.create({
                fullName,
                avatar: avatar ? avatar.url : "",
                email,
                password,
                userName: userName.toLowerCase()
            })

            const createdUser = await User.findById(user._id).select("-password -refreshToken");
            // creating auth jwt token
            const token = createJwtToken(createdUser);

            res.status(201).send({ body: createdUser, token: token, message: "user created successfully" });

        } catch (error) {

            res.status(500).send(error.message);
        }

    }


    // creating otp with twilio and storing in db
    async createOTP(req, res) {

        const { phone } = req.body;
        try {

            //otp generation
            const otp = generateOTP();

            //twilio api call to send message
            const message = await twilioClient.messages.create({
                body: `This is from spirit  - Your OTP is: ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: `+91${ phone }`,
            })

            //creating userOtp in database
            await userOtp.create({ otp, phone });

            res.send({ msg: "otp sent successfully", body: message })
        } catch (error) {
            console.log(error);
            res.status(402).send({
                msg: "error in sending otp to user"
            })
        }
    }

    // verifinying the provided otp from db
    async verifyOTP(req, res) {

        const { otp, phone } = req.body;
        try {

            const match = await userOtp.findOneAndDelete({ phone, otp });
            if (match) {

                res.status(200).send({
                    msg: "otp verified successfully",
                    body: match
                })

                return; 
            }

            res.status(405).send({ msg: 'invalid otp or expired otp', body: { otp, phone } });
        } catch (error) {
            res.status(405).send({ msg: 'some error occured to verify otp', body: { otp, phone, error } });

        }
    }
}

export default Auth;
