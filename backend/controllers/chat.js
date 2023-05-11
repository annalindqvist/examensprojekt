
import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

import {
    ObjectId
} from "mongodb";


const sendMessage = async (req, res) => {
    console.log(req.body)
   
}


export default {
    sendMessage,
    
};