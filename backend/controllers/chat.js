
import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

import {
    ObjectId
} from "mongodb";


const sendMessage = async (req, res) => {
    const {
       senderId,
       conversationId,
       text
    } = req.body.message;
   


     // add doc to db
     try {
        
        const messageDoc = new MessageModel({
            senderId,
            conversationId,
            text
        });
        await messageDoc.save();
        console.log(messageDoc)

        res.status(200).json(messageDoc);

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
   
}

const getChatMessages = async (req, res) => {
    try {
        const id = req.params.id;
        const messages = await MessageModel.find({
            conversationId: req.params.conversationId,
        });
        
        res.status(200).json(messages);

    } catch (err) {
        res.status(500).send('Server error');
    }
}


export default {
    sendMessage,
    getChatMessages,
    
};