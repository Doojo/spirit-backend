import jwt from 'jsonwebtoken';

export const createJwtToken = (user)=>{
    const token =  jwt.sign({_id:user._id}, process.env.JWT_SECRET_KEY);
    return token;
}