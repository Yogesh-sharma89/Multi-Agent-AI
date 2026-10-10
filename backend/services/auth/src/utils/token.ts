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

export const HashToken = (token: string) => {

  if (!token || !token.trim() || typeof token !== "string") {
    throw new AppError("Failed to hash invalid token", 400);
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex")
  return hashToken;
}


export const VerifyAccessToken = (token: string) => {
  
  const secret = EnvConfig.token.access;

  if (!secret) {
    throw new AppError("Access token verification is not configured", 500);
  }

  if (typeof token !== "string" || !token.trim()) {
    throw new AppError("Access token is required", 401);
  }

  try {
    const decoded = jwt.verify(token.trim(), secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !decoded.userId ||
      typeof decoded.email !== "string" ||
      !decoded.email ||
      typeof decoded.sessionId !== "string" ||
      !decoded.sessionId
    ) {
      throw new AppError("Access token has an invalid payload", 401);
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      sessionId: decoded.sessionId,
    } satisfies MyJwtPayload;

  } catch (error) {

    if (error instanceof AppError) {
      throw error;
    }

    if(error instanceof jwt.TokenExpiredError){
      throw new AppError("Access token is expired",401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Access token is invalid", 401);
    }

    throw new AppError("Failed to verify access token", 500);
  }
}


export const VerifyRefreshToken = (token:string)=>{

   const secret = EnvConfig.token.refresh;

  if (!secret) {
    throw new AppError("Access token verification is not configured", 500);
  }

  if (typeof token !== "string" || !token.trim()) {
    throw new AppError("Access token is required", 401);
  }

  try {
    const decoded = jwt.verify(token.trim(), secret);

    if (
      typeof decoded === "string" ||
      typeof decoded.userId !== "string" ||
      !decoded.userId ||
      typeof decoded.email !== "string" ||
      !decoded.email ||
      typeof decoded.sessionId !== "string" ||
      !decoded.sessionId
    ) {
      throw new AppError("Access token has an invalid payload", 401);
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      sessionId: decoded.sessionId,
    } satisfies MyJwtPayload;

  } catch (error) {

    if (error instanceof AppError) {
      throw error;
    }

    if(error instanceof jwt.TokenExpiredError){
      throw new AppError("Access token is expired",401);
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Access token is invalid", 401);
    }

    throw new AppError("Failed to verify access token", 500);
  }
}
