import { Router } from "express";
import ChatController from "../controllers/chat.js";
import verifyJWT from "../middlewares/auth.js";

const ChatRouter = Router();

// check online for all chat routes
ChatRouter.use(verifyJWT);

// open/start chat
ChatRouter.post("/chat/open", ChatController.openChat);

// send message
ChatRouter.post("/chat/send", ChatController.sendMessage);

// get all chats
ChatRouter.get("/chat", ChatController.getAllChats);

export default ChatRouter;