import type { Document, Types } from "mongoose";

export interface IConversation extends Document {
    title: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMessage extends Document {
    conversationId: Types.ObjectId;
    role: "user" | "assistant";
    content: string;
    createdAt: Date;
    updatedAt: Date;
}