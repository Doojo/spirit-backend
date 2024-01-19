import { connectToDB } from "./db/index.js";
import dotenv from "dotenv";
import app from "./app.js";

const port = process.env.PORT || 8000;
const host = "localhost";

dotenv.config({
  path: "./.env.sample"
});



connectToDB();

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
app.on("error", (err) => {
    console.log("Server error: ", err);
});