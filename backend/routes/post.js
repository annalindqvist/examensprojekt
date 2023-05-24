import { Router } from "express";
import PostController from "../controllers/post.js";
import verifyJWT from "../middlewares/auth.js";

const PostRouter = Router();

// check online for all post routes
PostRouter.use(verifyJWT);

// get all posts
PostRouter.get("/feed", PostController.getPosts);

// get one post
PostRouter.get("/feed/:id", verifyJWT, PostController.getOnePost);

// create new post
PostRouter.post("/post-to-feed", PostController.createPost);

// delete post
PostRouter.delete("/feed/delete/:id", PostController.deletePost);

// like post
PostRouter.put("/feed/like/:id", PostController.likePost);

// comment post
PostRouter.post("/feed/comment/:id", PostController.commentPost);

// comment post
PostRouter.delete("/feed/comment/:id", PostController.deleteComment);
export default PostRouter;