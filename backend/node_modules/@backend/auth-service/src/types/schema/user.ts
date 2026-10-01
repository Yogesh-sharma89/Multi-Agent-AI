import type { Document } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password?: string;
    firebaseId?: string;
    profileUrl?: string;
    phone?: string;
    isEmailVerified: boolean;
    isActive: boolean;
    provider: "local"  | "google" | "github";
    lastLoginAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
}