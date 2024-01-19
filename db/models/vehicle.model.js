import mongoose, {Schema} from "mongoose";

const vehicleSchema = new Schema({
    
    name:String

}, {timestamps: true});

export const Vehicles =  mongoose.model('Vehicle', userSchema);