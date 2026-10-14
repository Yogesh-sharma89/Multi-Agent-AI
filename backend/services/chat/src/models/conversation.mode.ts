import mongoose, { Schema, type Model } from "mongoose";
import type { IConversation } from "../types/schema/chat.js";

const conversationSchema = new Schema<IConversation>(
    {
        title: {
            type: String,
            default: "New Chat",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const ConversationModel: Model<IConversation> = mongoose.model<IConversation>(
    "Conversation",
    conversationSchema
);


export default ConversationModel;