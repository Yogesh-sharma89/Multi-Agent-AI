import type { Document, Types } from "mongoose";

export interface IUserDevice {
    userAgent?: string;
    os?: string;
    browser?: string;
    browserVersion?: string;
    engine?: string;
    engineVersion?: string;
    deviceType?: "desktop" | "mobile" | "tablet" | "bot" | "unknown";
    vendor?: string;
    model?: string;
}



export interface ISession extends Document {
    userId: Types.ObjectId;
    refreshTokenHash: string;
    ipAddress?: string;
    userDevice?: IUserDevice;
    isRevoked: boolean;
    revokedAt?: Date | null;
    expiresAt: Date;
    lastUsedAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
