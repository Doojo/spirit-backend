import { Router } from "express";
import { upload } from "../middlewares/index.js";
import  Auth  from "../controllers/auth.controller.js";
import { verify } from "../middlewares/verify.js";

const auth  = new Auth();
const authRouter = Router();

authRouter.post("/signup-start", auth.signUpStart);
authRouter.post("/verify-and-signup", auth.verifyOTPAndRegister);

authRouter.get("/verify/:token",verify, (req,res)=>{
    res.status(200).send({messsage:"user verified successfully", user:req.rootUser});
});
authRouter.post("/signin-start",auth.signInStart); 
authRouter.post("/verify-and-signin",auth.verifyOTPAndSignIn);
export default authRouter;