import { Router } from "express";
import UserController from "../controllers/user.js";
import verifyJWT from "../middlewares/auth.js";

const UserRouter = Router();

// SIGN IN ROUTE
UserRouter.post("/sign-in", UserController.signIn);

// SIGN UP ROUTE
UserRouter.post("/sign-up", UserController.signUpUser);

// user profile, verifyJWT should look for a jwt token?
UserRouter.get("/user/info", verifyJWT, UserController.getUserInfo);


export default UserRouter;