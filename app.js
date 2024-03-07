import express  from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/index.js";
import { connectToDB } from "./db/index.js";

const app = express();


const port = process.env.PORT || 8000;

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ message: 'Hello from  Backend' });
});
app.use("/api/v1/", router);

const PORT = process.env.PORT || 4000

const server = app.listen(PORT || 4000 ,()=>{

    console.log("listning at port 4000");
})