import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from 'path';

import UserRouter from './routes/user.js';
import PostRouter from './routes/post.js';

import * as url from 'url';
//const __filename = url.fileURLToPath(import.meta.url); 
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))


const app = express();


var corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: "50mb"}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname,'/test')));
app.use('/static', express.static('public/images'));


// route
// app.get("/", (req, res) => {
//   res.json({ message: "Hello there." });
// });

// ---- ROUTES
app.use(UserRouter);
app.use(PostRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});