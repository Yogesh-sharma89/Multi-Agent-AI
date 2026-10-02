import { AppError } from "@backend/shared";
import jwt from "jsonwebtoken";
import EnvConfig from "../config/env.config.js";
import crypto from "crypto";


export interface MyJwtPayload {
  userId: string;
  email: string;
  sessionId: string;
}

export const GenerateAccessToken = (payload: MyJwtPayload) => {

  if (!payload || typeof payload !== "object") {
    throw new AppError("Invalid token payload", 400);
  }

  const token = jwt.sign(payload, EnvConfig.token.access!);
  return token;

};

export const GenerateRefreshToken = (payload: MyJwtPayload) => {

  if (!payload || typeof payload !== "object") {
    throw new AppError("Invalid token payload", 400);
  }

  const token = jwt.sign(payload, EnvConfig.token.refresh!);
  return token;
  
};

export const HashToken = (token:string)=>{
 
    if(!token || !token.trim() || typeof token!=="string"){
        throw new AppError("Failed to hash invalid token",400);
    }

    const hashToken = crypto.createHash("sha256").update(token).digest("hex")
    return hashToken;
}
