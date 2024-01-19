
const mongoose = require('mongoose')


const database = "mongodb+srv://spirit:spirit@spirit.fbhpgfk.mongodb.net/";
const connectToDB = async()=>{

    mongoose.connect(`${database}`)
    .then(() => console.log("Database succesfully connected with server..."))
    .catch((err) => console.log(err));
}

module.exports = connectToDB;