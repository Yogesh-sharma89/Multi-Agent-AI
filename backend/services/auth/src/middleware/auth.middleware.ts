import {AppError, asyncHandler} from "@backend/shared";
import { VerifyAccessToken } from "../utils/token.js";
import {redisClient} from "@backend/shared"

const AuthMiddleware = asyncHandler(async(req,_res,next)=>{

    const accessToken = req.cookies?.accessToken;

    if(!accessToken || !accessToken.trim() || typeof accessToken!=="string"){
        throw new AppError("Invalid access token",401);
    }

    const validAccessToken = accessToken.trim();

    //verify access token

    const decoded = VerifyAccessToken(validAccessToken);

    const cacheKey = `session:${decoded.sessionId}`;

    //get the session from redis 
    const session = await redisClient.get(cacheKey);
    
    if(!session){
        throw new AppError("Your session is expired or revoked",401);
    }


    req.user = decoded;

    next();
})

export default AuthMiddleware;