import { connectToDB } from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config({
  path: "./.env.sample"
});


const port = process.env.PORT || 8000;
const host = "localhost";


connectToDB()
.then(() => {
    app.listen(port, host, () => {
      console.log(`[ ready ] http://${host}:${port}`);
    });
    app.on("error", (err) => {
        console.log("Server error: ", err);
    });
})
.catch((err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});