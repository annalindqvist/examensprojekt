import PostModel from "../models/post.js";
import {
    ObjectId
} from "mongodb";

// get all posts
const getPosts = async (req, res) => {
    const user_id = req.user._id
    //console.log(user_id);

    const posts = await PostModel.find({})
    .populate([{
        path: "postedBy",
        select: "firstname"
    }])
    .sort({
        createdAt: -1
    })
    .exec();

    const allPosts = [];

    posts.forEach(post => {
        if (user_id.valueOf() == post.postedBy._id.valueOf()){
            allPosts.push({post, postedByUser: true});
        } else {
            allPosts.push({post, postedByUser: false});
    }
    });
    //console.log(allPosts);

    res.status(200).json(allPosts);

    if (!posts) {
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
    //console.log(req.body, req);

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
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

export default {
    getPosts,
    createPost
};