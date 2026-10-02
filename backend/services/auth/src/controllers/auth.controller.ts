import { AppError, asyncHandler } from "@backend/shared";
import firebaseAdminAuth from "../config/firebase.js";
import UserModel from "../models/user.model.js";
import { Types } from "mongoose";
import SessionModel from "../models/session.model.js";
import getDeviceInfo from "../utils/getDeviceInfo.js";
import { GenerateAccessToken, GenerateRefreshToken, HashToken } from "../utils/token.js";
import EnvConfig from "../config/env.config.js";

export const firebaseAuth = asyncHandler(async (req, res) => {

    const { tokenId } = req.body;

    if (!tokenId || !tokenId.trim() || typeof tokenId !== "string") {
        throw new AppError("Invalid token Id", 400);
    }

    const validTokenId = tokenId.trim();

    const decoded = await firebaseAdminAuth.verifyIdToken(validTokenId);

    if (!decoded.email) {
        throw new AppError("User email is required", 400);
    }

    if (!decoded.exp || decoded.exp <= Date.now() / 1000) {
        throw new AppError("token is expired", 401);
    }

    let user = await UserModel.findOne({
        firebaseId: decoded.uid,
        email: decoded.email,
    });

    if (user) {
        throw new AppError("User already exists with this email", 400);
    }

    const firebaseUser = await firebaseAdminAuth.getUser(decoded.uid);

    if (!firebaseUser) {
        throw new AppError("Failed to fetch your info", 500);
    }

    user = await UserModel.create({
        fullName: firebaseUser.displayName ?? "User",
        email: firebaseUser.email ?? decoded.email,
        isEmailVerified: firebaseUser.emailVerified,
        profileUrl: firebaseUser.photoURL ?? "",
        firebaseId: firebaseUser.uid,
        phone: firebaseUser.phoneNumber ?? "",
        isActive: true,
        provider: firebaseUser.providerData[0]?.providerId ?? "firebase",
    });



    //now user is created 
    //Create user session

    const sessionId = new Types.ObjectId();

    const payload = {
        userId: user._id.toString(),
        sessionId: sessionId.toString(),
        email: user.email
    }

    const userDevice = getDeviceInfo(req);

    const refreshToken = GenerateRefreshToken(payload)

    const refreshTokenHash = HashToken(refreshToken);

    const REFRESH_TOKEN_EXPIRY = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await SessionModel.create({

        _id: sessionId,
        userId: user._id,
        refreshTokenHash,
        ipAddress: req.ip || "",
        userDevice,
        expiresAt: REFRESH_TOKEN_EXPIRY,
        lastUsedAt: new Date()
    });

    //now create access token and save into cookies 

    const accesstoken = GenerateAccessToken(payload);

    const cookieOptions = {
        httpOnly: true,
        secure: EnvConfig.environment === "production",
        sameSite: "lax" as const,
        maxAge: 15 * 60 * 1000
    }

    res.cookie("accessToken", accesstoken, {
        ...cookieOptions
    })

    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(201).json({
        success: true,
        message: "User account created successfully",
        data: {
            user: {
                id: user._id,
                name: user.fullName,
                email: user.email,
                profileUrl: user.profileUrl
            }
        }
    })
});