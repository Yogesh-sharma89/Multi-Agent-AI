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
    provider: string
    createdAt: Date;
    updatedAt: Date;
}