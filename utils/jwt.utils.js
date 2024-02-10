import jwt from 'jsonwebtoken';

export const createJwtToken = (userDetails)=>{
    const token =  jwt.sign({...userDetails, exp: Math.floor(Date.now() / 1000) + (86400 * 14) }, process.env.JWT_SECRET_KEY,{ expiresIn: '14d' });
    return token;
}