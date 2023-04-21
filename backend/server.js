import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import UserRouter from './routes/user.js';
import PostRouter from './routes/post.js';

const app = express();

var corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

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