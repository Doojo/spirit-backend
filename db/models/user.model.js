import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    level: {
        type: Number,
        default: 0,
    },

}, {timestamps: true});

export const User =  mongoose.model('User', userSchema);