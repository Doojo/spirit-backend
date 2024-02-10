import { Router } from "express";
import { upload } from "../middlewares/index.js";
import  Auth  from "../controllers/auth.controller.js";
import { verify } from "../middlewares/verify.js";

const auth  = new Auth();
const authRouter = Router();

authRouter.post("/register", auth.createProfile);
authRouter.get("/verify/:token",verify, (req,res)=>{
    res.status(200).send({messsage:"user verified successfully", user:req.rootUser});
});
authRouter.post("/otp/create",auth.createOTP); 
authRouter.post("/otp/verify",auth.verifyOTP);
export default authRouter;