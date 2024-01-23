import { Router } from "express";
import { upload } from "../middlewares/index.js";
import  Auth  from "../controllers/auth.controller.js";

const auth  = new Auth();
const authRouter = Router();

authRouter.post("/register", auth.register);
authRouter.post("/otp/create",auth.createOTP);
authRouter.post("/otp/verify",auth.verifyOTP);
export default authRouter;