// IMPORT DEPENDENCIES
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from 'path';
import { Server } from "socket.io";
import * as url from 'url';
import http from 'http';

// ROUTES IMPORT
import UserRouter from './routes/user.js';
import PostRouter from './routes/post.js';
import ChatRouter from './routes/chat.js';

const app = express();

// Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

var corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: "50mb"}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// access images from frontend
app.use('/static', express.static('public/images'));

// ---- ROUTES
app.use(UserRouter);
app.use(PostRouter);
app.use(ChatRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// SOCKET.IO Functions

// collect all connected users
let connectedUsers = [];
const newConnectedUser = (userId, socketId) => {
  !connectedUsers.some((user) => user.userId === userId) &&
    connectedUsers.push({userId, socketId})
};

const disconnectUser = (socketId) => {
  connectedUsers = connectedUsers.filter((user) => user.socketId !== socketId);
};

const getConnectedUser = (userId) => {
  return connectedUsers.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('A user connected.');

  // add new connected user
  socket.on("newConnectedUser", (userId) => {
    newConnectedUser(userId, socket.id);
    console.log(connectedUsers)
  });

  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    console.log("RECEIVER", receiverId)
    const user = getConnectedUser(receiverId);
    console.log("USER", user)
    if(user) {
      io.to(user.socketId).emit("getMessage", {
        sender: senderId,
        text,
      });
    }
    
  });

  // disconnectioned user
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
    disconnectUser(socket.id);
  });
});