import PostModel from "../models/post.js";
import {
    ObjectId
} from "mongodb";

// reusable function to get all posts 
const getAllPosts = async () => {

    const posts = await PostModel.find({})
    .populate([{
        path: "postedBy",
        select: "firstname"
    }])
    .sort({
        createdAt: -1
    })
    .exec();
    return posts;
}

// get all posts
const getPosts = async (req, res) => {
    
    const allPosts = await getAllPosts();

    res.status(200).json(allPosts);

    if (!allPosts) {
        return res.status(400).json({
            error: 'No posts found'
        });
    }
}

// create new post to feed
const createPost = async (req, res) => {
    const {
        post
    } = req.body;

    if (!post) {
        res.status(400).json({
            error: "Please fill in a post."
        })
    }

    // add doc to db
    try {
        const postedBy = new ObjectId(req.user._id);
        const postDoc = new PostModel({
            post,
            postedBy
        });
        await postDoc.save();
        console.log(postDoc)

        // send back only the created post with populated firstname or getallPosts?
        const allPosts = await getAllPosts();
        res.status(200).json(allPosts);
        
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// delete post
const deletePost = async (req, res) => {
    console.log("test");
    const { id } = req.params;
    console.log("req.params", req.params);

    const deletedPost = await PostModel.findOneAndDelete({
        _id: id
    })
    if (!deletedPost) {
        return res.status(404).json({error: 'No post deleted'});
    }
  
    res.status(200).json(id);
  }

export default {
    getPosts,
    createPost,
    deletePost
};