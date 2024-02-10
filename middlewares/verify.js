import jwt from 'jsonwebtoken';
import { User } from "../db/models/index.js";


export const verify = async (req, res, next) => {

    try {

        const {token} = req.params;
        if (!token) {
            res.status(404).send("token not found");
            return;
        }

        const res = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const rootUser = await User.findOne({ email:res.email }, { password:0 })
            

        if (!rootUser) {
            res.status(404).send("error!! invalid token")
            return;
        }

        req.rootUser = rootUser;
        req.token = token;

        next();


    } catch (error) {
        // console.log(error.message);
        res.status(404).send("error to authenticate...");
    }
}

