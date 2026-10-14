import { AppError } from "@backend/shared";
import jwt from "jsonwebtoken";


export interface MyJwtPayload {
  userId: string;
  email: string;
  sessionId: string;
}


export const VerifyAccessToken = (token: string) => {
  
  const secret =process.env.ACCESS_TOKEN_SCRET;

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



