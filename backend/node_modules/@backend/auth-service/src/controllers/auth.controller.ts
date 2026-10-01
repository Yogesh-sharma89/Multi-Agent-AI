import { AppError, asyncHandler } from "@backend/shared";
import firebaseAdminAuth from "../config/firebase.js";

export const firebaseAuth = asyncHandler(async(req,res)=>{

    const {tokenId}  = req.body;

    if(!tokenId || !tokenId.trim() || typeof tokenId!=="string"){
        throw new AppError("Invalid token Id",400);
    }

    const validTokenId = tokenId?.trim();

    //check with firebase 
    const decoded = await firebaseAdminAuth.verifyIdToken(validTokenId);
    
})