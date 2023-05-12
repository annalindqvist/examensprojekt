
import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

import {
    ObjectId
} from "mongodb";

const openChat = async (req, res) => {
    console.log(req.body.members)
    const {
        reciever,
        me
     } = req.body.members;

    try {
        
        const chat = await ChatModel.find({
            members: { $all: [reciever, me] },
        });
        console.log("chat", chat.length)
        if (chat.length > 0) {
            console.log("there is a chat")
            console.log(chat[0])
            const messages = await MessageModel.find({
                conversationId: chat[0]._id,
            });
            console.log("messages", messages)
            res.status(200).json({chat: chat[0]._id, messages});
        } else {
            console.log("no chat")
            const chatDoc = new ChatModel({
                members: [reciever, me]
            });
            await chatDoc.save();
            console.log(chatDoc)
    
            res.status(200).json({chat: chatDoc._id, messages: []});
        }
        
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const sendMessage = async (req, res) => {
    const {
       senderId,
       conversationId,
       text
    } = req.body.message;

     // add doc to db
     try {

        console.log(conversationId)
        
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
    openChat,
    sendMessage,
    getChatMessages,
    
};