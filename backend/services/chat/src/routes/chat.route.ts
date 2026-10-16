import {Router} from "express"
import {
    createConversation,
    deleteConversation,
    getAllConversations,
    getConversationById,
} from "../controllers/conversation.controller.js";
import { createMessage } from "../controllers/message.controller.js";



const chatRouter = Router();

chatRouter.post("/",createConversation);

chatRouter.get("/all",getAllConversations);

chatRouter.get("/:id", getConversationById);

chatRouter.delete("/:id",deleteConversation);

//Message Routes

chatRouter.post("/:id/message",createMessage);




export default chatRouter;
