import { Router } from "express";
import UserController from "../controllers/user.js";
import verifyJWT from "../middlewares/auth.js";
import multer from "multer";
import path from 'path';

const UserRouter = Router();

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage, limits: {fileSize: 3000000}});

// SIGN IN ROUTE
UserRouter.post("/sign-in", UserController.signIn);

// SIGN UP ROUTE
UserRouter.post("/sign-up", UserController.signUpUser);

// user profile, verifyJWT should look for a jwt token?
UserRouter.get("/user/info", verifyJWT, UserController.getUserInfo);

// user profile, verifyJWT should look for a jwt token?
UserRouter.put("/user/edit", verifyJWT, upload.single('image'), UserController.editProfile);


export default UserRouter;