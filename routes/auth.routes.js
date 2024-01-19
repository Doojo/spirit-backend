import { Router } from "express";
import { upload } from "../middlewares/index.js";
import  auth  from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
    ]),
    auth.register
);



export default authRouter;