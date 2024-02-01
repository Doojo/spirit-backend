import mongoose, {Schema} from "mongoose";

const userOtpSchema = new Schema({

    otp:String,
    email:String

}, {timestamps: true});

export const userOtp =  mongoose.model('userOtp', userOtpSchema);