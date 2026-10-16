import { AppError, asyncHandler } from "@backend/shared";
import { Types } from "mongoose";
import ConversationModel from "../models/conversation.mode.js";
import MessageModel from "../models/message.model.js";

export const createConversation = asyncHandler(async (req, res) => {

    const userId = req.headers["x-user-id"];

    if (!userId || Array.isArray(userId) || typeof userId === "undefined" || !userId.trim()) {
        throw new AppError("Invalid user details", 400);
    }

    const newConversation = await ConversationModel.create({
        userId
    })

    return res.status(201).json({
        success: true,
        message: "New conversation created",
        conversation: newConversation
    })
})


export const getAllConversations = asyncHandler(async (req, res) => {

    const userId = req.headers["x-user-id"] as string;

    if (!userId || !userId.trim()) {
        throw new AppError("Invalid user Id", 400);
    }

    const allConversations = await ConversationModel.find({ userId }).lean().sort({updatedAt:-1});

    return res.status(200).json({
        success: true,
        message: "Conversations  fetch successfully",
        conversations: allConversations
    })

})

export const getConversationById = asyncHandler(async (req, res) => {

    const userId = req.headers["x-user-id"];

    const { id: conversationId } = req.params;

    if (!userId || Array.isArray(userId) || !userId.trim() || !Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user Id", 400);
    }

    if (!conversationId || Array.isArray(conversationId) || !Types.ObjectId.isValid(conversationId)) {
        throw new AppError("Invalid conversation Id", 400);
    }

    const conversation = await ConversationModel.findOne({
        _id: conversationId,
        userId,
    }).lean();

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    const messages = await MessageModel.find({ conversationId })
        .sort({ createdAt: 1 })
        .lean();

    return res.status(200).json({
        success: true,
        message: "Conversation fetched successfully",
        conversation,
        messages,
    });
});


export const deleteConversation = asyncHandler(async (req, res) => {

    const userId = req.headers["x-user-id"];

    const { id: conversationId } = req.params;

    if (!userId || Array.isArray(userId) || !userId.trim() || !Types.ObjectId.isValid(userId)) {
        throw new AppError("Invalid user Id", 400);
    }

    if (!conversationId || Array.isArray(conversationId) || !Types.ObjectId.isValid(conversationId)) {
        throw new AppError("Invalid conversation Id", 400);
    }

    const conversation = await ConversationModel.findOne({
        _id: conversationId,
        userId,
    }).lean();

    if (!conversation) {
        throw new AppError("Conversation not found", 404);
    }

    //delete the conversation and it's messages

    await ConversationModel.findByIdAndDelete(conversation._id);

    //delete the conversation of that message

    await MessageModel.deleteMany({
        conversationId:conversation._id
    })

    return res.status(200).json({
        success:true,
        message:"Conversation deleted successfully"
    })

})