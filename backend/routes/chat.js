import { Router } from "express";
import ChatController from "../controllers/chat.js";
import verifyJWT from "../middlewares/auth.js";

const ChatRouter = Router();

// check online for all post routes
ChatRouter.use(verifyJWT);

ChatRouter.post("/chat/send", ChatController.sendMessage);


export default ChatRouter;