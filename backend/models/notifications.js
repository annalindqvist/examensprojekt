import mongoose from "mongoose";
import dotenv from "dotenv";
import {
    exit
} from "process";

const Schema = mongoose.Schema;

// Read from .env file and add to process.env
dotenv.config();

// Exit program if no connection string
if (!process.env.MONGO_CONNECTION_STR) {
    console.error("MONGO_CONNECTION_STR is not defined in .env file");
    exit();
}

// Connect to database
mongoose.connect(process.env.MONGO_CONNECTION_STR);

const notificationsSchema = new Schema({
    notifictionType: {
        type: String,
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    senderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    recieverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const NotificationsModel = mongoose.model('notifications', notificationsSchema);

export default NotificationsModel;