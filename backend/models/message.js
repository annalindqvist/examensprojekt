import mongoose from "mongoose";
import dotenv from "dotenv";
import {
    exit
} from "process";

const Schema = mongoose.Schema;

// read from .env file and add to process.env
dotenv.config();

// exit program if no connection string
if (!process.env.MONGO_CONNECTION_STR) {
    console.error("MONGO_CONNECTION_STR is not defined in .env file");
    exit();
}

// Connect to database
mongoose.connect(process.env.MONGO_CONNECTION_STR);

const messageSchema = new Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
    },
}, {
    timestamps: true
});

const MessageSchema = mongoose.model('Message', messageSchema);

export default MessageSchema;