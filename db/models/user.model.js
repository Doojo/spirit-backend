import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        min: 1,
        max: 4,
        default: 1,
    },
    mobile:{
        type:String,
        require:true,
        length:10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
    
}, {timestamps: true});

export const User =  mongoose.model('User', userSchema);