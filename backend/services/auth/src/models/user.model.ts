import mongoose, { Schema, type Model } from "mongoose";
import type { IUser } from "../types/schema/user.js";


const userSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
            select: false,
        },
        firebaseId: {
            type: String,
            sparse: true,
            unique: true,
            trim: true,
        },
        profileUrl: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        provider: {
            type: String,
            default: "local",
        },
    },
    {
        timestamps: true,
    }
);

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;