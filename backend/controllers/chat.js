import ChatModel from "../models/chat.js";
import MessageModel from "../models/message.js";

// open chat and get messages or start new chat
// return chatId and old messages
const openChat = async (req, res) => {
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
            const messages = await MessageModel.find({
                conversationId: chat[0]._id,
            }) .populate("senderId", "_id")
            .exec();
            
            res.status(200).json({chat: chat[0]._id, messages});
        } else {
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
    
     // add doc to db
     try {
        const messageDoc = new MessageModel({
            senderId,
            conversationId,
            text
        });
        await messageDoc.save();
        res.status(200).json({conversationId: messageDoc.conversationId, text: messageDoc.text, senderId: {_id: messageDoc.senderId}, createdAt: messageDoc.createdAt});

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

const getAllChats = async (req, res) => {
    try {
        const id = req.user._id;
        const allChats = await ChatModel.find({
            members: { $in: [ id ] },
        }).populate('members').select('-password')
        .exec();;
        
        res.status(200).json(allChats);

    } catch (err) {
        res.status(500).send('Server error');
    }
}


export default {
    openChat,
    sendMessage,
    getAllChats,
    
};