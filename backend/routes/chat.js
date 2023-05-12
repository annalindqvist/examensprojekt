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

// get old chat history
ChatRouter.get("/chat/messages:id", ChatController.getChatMessages);

export default ChatRouter;