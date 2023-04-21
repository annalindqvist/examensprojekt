import { Router } from "express";
import PostController from "../controllers/post.js";
import verifyJWT from "../middlewares/auth.js";

const PostRouter = Router();

// check online for all post routes
PostRouter.use(verifyJWT);

// get all posts
PostRouter.get("/feed", PostController.getPosts);

// create new post
PostRouter.post("/post-to-feed", PostController.createPost);

export default PostRouter;