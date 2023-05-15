
import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

import {
    ObjectId
} from "mongodb";

// open chat and get messages or start new chat
// return chatId and old messages
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
        // chat returns as an array, if > 0 there is one chat
        if (chat.length > 0) {
            console.log("there is a chat")
            const messages = await MessageModel.find({
                conversationId: chat[0]._id,
            }) .populate("senderId", "_id")
            .exec();
            console.log(messages)
            res.status(200).json({chat: chat[0]._id, messages});
        } else {
            console.log("no chat")
            const chatDoc = new ChatModel({
                members: [reciever, me]
            });
            await chatDoc.save();
            // return chatId and empty array of messages
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
    
    console.log("SENDERID,", senderId)
     // add doc to db
     try {
        const messageDoc = new MessageModel({
            senderId,
            conversationId,
            text
        });
        await messageDoc.save();

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