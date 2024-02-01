import {Router} from 'express';
import authRouter from './auth.router.js';

const router = Router();

router.get('/' ,(req,res)=>{
    res.json({
        api:"success",
        application:"spirit",
        author:"Dojjo",
        version:"1.0.0"
    })
})

router.use('/auth' ,authRouter);

export default router;