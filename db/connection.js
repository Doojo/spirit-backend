import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const database = "mongodb+srv://spirit:spirit@spirit.fbhpgfk.mongodb.net/";
const connectToDB = async () => {
    try {
       
        const db = await mongoose.connect(`mongodb+srv://spirit:spirit@spirit.fbhpgfk.mongodb.net/${DB_NAME}`)
        console.log('Database is connected to:', db.connection.host);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export { connectToDB };