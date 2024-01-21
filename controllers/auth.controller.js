import {User} from "../db/models/index.js";
import {ApiError, ApiResponse, asyncHandler, createJwtToken, uploadOnCloudinary} from "../utils/index.js";

class Auth{
    async register(req, res){

        const {userName,fullName, email, password, imgData} = req.body;
        try {

        // Check if user already exists
        const existedUser = await User.findOne({
            $or: [{ userName }, { email }]
        })
    
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }

        // handling image upload
        const avatarLocalPath = imgData?.path;
  
        const avatar = await uploadOnCloudinary(avatarLocalPath);
        

        // create user
        const user = await User.create({
            fullName,
            avatar: avatar?avatar.url:"",
            email, 
            password,
            userName: userName.toLowerCase()
        })
    
        const createdUser = await User.findById(user._id).select("-password -refreshToken");
        // creating auth jwt token
        const token = createJwtToken(createdUser);

        res.status(201).send({body:createdUser,token:token,message:"user created successfully"});

        } catch (error) {
            
            res.status(500).send(error.message);
        }
        
    }
}

export default Auth;
