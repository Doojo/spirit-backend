import express  from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/index.js";
import { connectToDB } from "./db/index.js";

const app = express();


const port = process.env.PORT || 8000;
const host = "localhost";

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send({ message: 'Hello from  Backend' });
});
app.use("/api/v1/", router);

app.listen(port, host, () => {
    console.log(`[ ready ] http://${host}:${port}`);
  });
  app.on("error", (err) => {
      console.log("Server error: ", err);
  });