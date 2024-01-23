import mongoose, {Schema} from "mongoose";

const userOtpSchema = new Schema({

    otp:String,
    phone:String

}, {timestamps: true});

export const userOtp =  mongoose.model('userOtp', userOtpSchema);