import mongoose, { Schema, type Model } from "mongoose";
import type { IMessage } from "../types/schema/chat.js";

const messageSchema = new Schema<IMessage>(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
            index: true,
        },
        role: {
            type: String,
            enum: ["user", "assistant"],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel: Model<IMessage> = mongoose.model<IMessage>("Message", messageSchema);

export default MessageModel;
