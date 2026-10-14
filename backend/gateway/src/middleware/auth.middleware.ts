import { AppError, asyncHandler, redisClient, VerifyAccessToken } from "@backend/shared";

const Authenticate = asyncHandler(async(req,res,next)=>{

    const accessToken = req.cookies.accessToken;

    if(!accessToken || !accessToken.trim() || typeof accessToken!=="string"){
        throw new AppError("Invalid or missing token",401)
    } 
    
    const validAccessToken =  accessToken.trim();

    const decoded  = VerifyAccessToken(validAccessToken);

    //now check the session 
    const session = await redisClient.get(`session:${decoded.sessionId}`);

    if(!session){
        throw new AppError("Session expire or revoked",401);
    }

    req.user = decoded;

    next();

})

export default Authenticate;