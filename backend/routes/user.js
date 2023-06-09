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

// SIGN IN ROUTE - /backend/signin
UserRouter.post("/sign-in", UserController.signIn);

// SIGN UP ROUTE
UserRouter.post("/sign-up", UserController.signUpUser);

// Get user profile
UserRouter.get("/user/info", verifyJWT, UserController.getUserInfo);

// edit user profile information
UserRouter.put("/user/edit", verifyJWT, UserController.editProfile);

UserRouter.put("/user/edit-profile-image", verifyJWT, upload.single('image'), UserController.editProfilePicture);

UserRouter.put("/user/auth-settings", verifyJWT, UserController.editAuthSettings);

UserRouter.get("/all-users", verifyJWT, UserController.getAllUsers);

UserRouter.get("/user/:id", verifyJWT, UserController.getOneUser);

UserRouter.post("/user/save", verifyJWT, UserController.saveOneUser);

UserRouter.delete("/user/delete-account", verifyJWT, UserController.deleteAccount);

// GET NOTIFICATIONS
UserRouter.get("/notifications", verifyJWT, UserController.getNotifications);


export default UserRouter;