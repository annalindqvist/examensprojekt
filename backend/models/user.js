import mongoose from "mongoose";
import dotenv from "dotenv";
import {
    exit
} from "process";
import bcrypt from "bcrypt";

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

const userSchema = new Schema({
    firstname: {
        type: String,
        required: "Firstname must be filled in",
        minlength: 1,
        maxlength: 15, 
    },
    lastname: {
        type: String,
        required: "Lastname must be filled in",
        minlength: 1,
        maxlength: 20, 
    },
    email: {
        type: String,
        required: "Email must be filled in",
        unique: true,
        match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    password: {
        type: String,
        required: "Password must be filled in",
        minlength: 8,
        maxlength: 24
    },
    img: {
        type: String,
    },
    age: {
        type: Number,
    },
    description: {
        type: String,
        maxlength: 500,
    },
    city: {
        type: String,
        maxlength: 50,
    },
    savedGirls: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }]
})

userSchema.pre('save', function (next) {
    if (this.password) {
        let salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    next();
})

userSchema.methods.matchPassword = async function(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (err) {
        throw new Error("Login failed, try again", err);
    }
}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;