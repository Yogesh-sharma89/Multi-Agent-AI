import mongoose, { Schema, type Model } from "mongoose";
import type { ISession } from "../types/schema/session.js";

const userDeviceSchema = new Schema(
    {
        userAgent: { type: String, default: "" },
        os: { type: String, default: "" },
        browser: { type: String, default: "" },
        browserVersion: { type: String, default: "" },
        engine: { type: String, default: "" },
        engineVersion: { type: String, default: "" },
        deviceType: {
            type: String,
            enum: ["desktop", "mobile", "tablet", "bot", "unknown"],
            default: "unknown",
        },
        vendor: { type: String, default: "" },
        model: { type: String, default: "" },
    },
    { _id: false }
);

const sessionSchema = new Schema<ISession>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        refreshTokenHash: {
            type: String,
            required: true,
            trim: true,
        },
        ipAddress: {
            type: String,
            default: "",
        },
        userDevice: {
            type: userDeviceSchema,
            default: {},
        },
        isRevoked: {
            type: Boolean,
            default: false,
        },
        revokedAt: {
            type: Date,
            default: null,
        },
        expiresAt: {
            type: Date,
            required: true,
        },
        lastUsedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

sessionSchema.index({expiresAt:1},{ expireAfterSeconds: 0 })
sessionSchema.index({ userId: 1, expiresAt: 1 });
sessionSchema.index({ refreshTokenHash: 1 }, { unique: true });
sessionSchema.index({ userId: 1, lastUsedAt: -1 });

const SessionModel: Model<ISession> = mongoose.model<ISession>("Session", sessionSchema);

export default SessionModel;
