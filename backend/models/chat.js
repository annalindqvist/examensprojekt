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

const chatSchema = new Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, {
    timestamps: true
});

const ChatModel = mongoose.model('Chat', chatSchema);

export default ChatModel;