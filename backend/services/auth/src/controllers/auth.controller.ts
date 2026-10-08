import { AppError, asyncHandler } from "@backend/shared";
import firebaseAdminAuth from "../config/firebase.js";
import UserModel from "../models/user.model.js";
import { Types } from "mongoose";
import SessionModel from "../models/session.model.js";
import getDeviceInfo from "../utils/getDeviceInfo.js";
import { GenerateAccessToken, GenerateRefreshToken, HashToken } from "../utils/token.js";
import EnvConfig from "../config/env.config.js";
import {redisClient} from "@backend/shared"

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

    const isExistingUser = Boolean(user);

    if (!user) {
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
    }

    // Create a fresh session for both new and returning users.

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

    const cacheKey = `session:${sessionId}`;

    //Paralley create session and save in redis

     await Promise.all([

        SessionModel.create({

            _id: sessionId,
            userId: user._id,
            refreshTokenHash,
            ipAddress: req.ip || "",
            userDevice,
            expiresAt: REFRESH_TOKEN_EXPIRY,
            lastUsedAt: new Date()
        })
        ,
        redisClient.set(cacheKey, JSON.stringify({ userId: user._id, sessionId }), "EX", 7 * 24 * 60 * 60),

    ])


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

    return res.status(isExistingUser ? 200 : 201).json({
        success: true,
        message: isExistingUser ? "User logged in successfully" : "User account created successfully",
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

export const GetCurrentUser = asyncHandler(async (req, res) => {

    const currentUser = req.user;

    const user = await UserModel.findById(currentUser.userId).lean();

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
            user: {
                id: user?._id,
                fullname: user?.fullName,
                email: user?.email,
                profileUrl: user?.profileUrl
            }
        }
    })

})

export const Logout = asyncHandler(async (req, res) => {

    const currentUser = req.user;

    //find user session on this device
    const session = await SessionModel.findById(currentUser.sessionId);

    if (session) {

        //Only then delete the session 
        await SessionModel.findByIdAndDelete(session._id)
    }

    //invalidate redis cache 

    await redisClient.del(`session:${currentUser.sessionId}`)

    //Session exists or not let the user logout on both situation

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message: "User logout successfully"
    })
})

export const LogoutOnAllDevices = asyncHandler(async (req, res) => {

    const currentUser = req.user;

    await SessionModel.deleteMany({
        userId: currentUser.userId
    })

    await redisClient.del(`session:${currentUser.sessionId}`)

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken")


    return res.status(200).json({
        success: true,
        message: "User session deleted from all devices"
    })

})