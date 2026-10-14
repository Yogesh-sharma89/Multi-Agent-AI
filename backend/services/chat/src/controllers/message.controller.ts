import { AppError, asyncHandler } from "@backend/shared";
import { Types } from "mongoose";
import MessageModel from "../models/message.model.js";

const allowedRoles = ['user',"assistant"];

export const createMessage = asyncHandler(async(req,res)=>{

    const {role,content} = req.body;
    const {id:conversationId} = req.params;

    if(!role || !role.trim() || !allowedRoles.includes(role)){
        throw new AppError("Invalid role",400);
    }

    if(!content || !content.trim()){
        throw  new AppError("Invalid content",400);
    }

    if(!conversationId || Array.isArray(conversationId) || !Types.ObjectId.isValid(conversationId)){
        throw new AppError("Invalid conversation id",400);
    }

    //cretae message
    const newMessage = await MessageModel.create({
        conversationId,
        role ,
        content
    })

    return res.status(201).json({
        success:true,
        message:"Message created successfully",
        messageData:newMessage
    })
})