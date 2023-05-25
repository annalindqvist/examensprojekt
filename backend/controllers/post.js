import PostModel from "../models/post.js";
import LikeModel from "../models/like.js";
import CommentModel from "../models/comment.js";

import {
    ObjectId
} from "mongodb";

// reusable function to get all posts 
const getAllPosts = async () => {

    const posts = await PostModel.find({})
        .populate([{
            path: "postedBy",
            select: "firstname img city"
        }, {
            path: "likes",
            populate: {
                path: 'likedBy',
                select: "_id",
                model: 'User'
            },
        }])
        .sort({
            createdAt: -1
        })
        .exec();
    return posts;
}

// get all posts
const getPosts = async (req, res) => {

    try {
        const allPosts = await getAllPosts();
        res.status(200).json(allPosts);
        if (!allPosts) {
            return res.status(400).json({
                message: 'No posts found'
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: 'No posts found'
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

    try {

   
    const {
        id
    } = req.params;

    const deletedPost = await PostModel.findOneAndDelete({
        _id: id
    })
    if (!deletedPost) {
        return res.status(404).json({
            error: 'No post deleted'
        });
    }
    res.status(200).json(id);
} catch(err) {
    return res.status(500).json({message: "Something went wrong"});
}
}

async function likePost(req, res) {

    try {
        // get postid and who liked
        const {
            id
        } = req.params;
        const likedByUser = req.user._id;

        // find the post 
        const findPost = await PostModel.find({
                _id: id
            })
            .populate("likes")
            .exec()

        // alreadyLike returns true or false
        // true if user already liked the post
        // false if the user has not liked the post
        const alreadyLike = findPost[0].likes.some(like => String(like.likedBy) === String(likedByUser));

        // if aldready liked post, remove the like
        if (alreadyLike) {
            // returns an array containting true or false values
            const findLikeId = findPost[0].likes.map(like => String(like.likedBy) === String(likedByUser));
            // using findLikeId array to catch the index of the likeID in likeCollection
            let likeId;
            for (let i = 0; i < findLikeId.length; i++) {
                if (findLikeId[i] == true) {
                    likeId = findPost[0].likes[i]._id;
                };
            };
            // remove the like from likeCollection
            const dislike = await LikeModel.deleteOne({
                _id: likeId,
            });
            if (dislike.deletedCount == 0) {
                res.status(200).json({message: "Something went wrong"});

            } else {
                // remove the likeID from the post 
                await PostModel.updateOne({
                    _id: id
                }, {
                    $pull: {
                        'likes': likeId
                    }
                });
            }

            // if not aldready liked the post
        } else {
            // add one like
            const likeDoc = new LikeModel({
                like: true,
                likedBy: likedByUser,
                post: id
            });
            await likeDoc.save();
            // add to post
            await PostModel.updateOne({
                _id: id
            }, {
                $push: {
                    'likes': {
                        _id: likeDoc._id
                    }
                }
            });
        }

        const allPosts = await getAllPosts()
        const selectedPost = await getSelectedPost(id)
        res.status(200).json({
            posts: allPosts,
            selectedPost: selectedPost
        });

    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: err
        });
    }
}

async function commentPost(req, res) {

    try {
        // get comment, post-id and who posted comment
        const {
            comment
        } = req.body;
        const {
            id
        } = req.params;
        const postedBy = req.user._id;

        // create commentDocument
        const commentDoc = new CommentModel({
            comment,
            postedBy,
            post: id
        });
        // save comment do db 
        await commentDoc.save();
        // push commentID to post-comment-array
        await PostModel.findOneAndUpdate({
            _id: id
        }, {
            $push: {
                "comments": commentDoc._id
            }
        });

        const allPosts = await getAllPosts()
        const selectedPost = await getSelectedPost(id)
        res.status(200).json({
            posts: allPosts,
            selectedPost: selectedPost
        });

    } catch (err) {
        res.status(400).json({
            message: err
        });
    }
}

const getOnePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await PostModel.findOne({
                _id: id
            }).populate([{
                    path: "postedBy",
                    select: "firstname img city",
                },
                {
                    path: "comments",
                    populate: {
                        path: 'postedBy',
                        select: "firstname img _id",
                        model: 'User',
                    },
                },
                {
                    path: "likes",
                    populate: {
                        path: 'likedBy',
                        select: "_id",
                        model: 'User',
                    },
                }
            ])
            .exec();
        res.status(200).json(post);

    } catch (err) {
        res.status(500).send('Server error');
    }
}

const getSelectedPost = async (id) => {
    try {

        const post = await PostModel.findOne({
                _id: id
            }).populate([{
                    path: "postedBy",
                    select: "firstname img city",
                },
                {
                    path: "comments",
                    populate: {
                        path: 'postedBy',
                        select: "firstname img _id",
                        model: 'User',
                    },
                },
                {
                    path: "likes",
                    populate: {
                        path: 'likedBy',
                        select: "_id",
                        model: 'User',
                    },
                }
            ])
            .exec();
        return post;

    } catch (err) {
        console.log(err)
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params;
    const postId = req.body.postId;

    try {

        const removeComment = await CommentModel.deleteOne({
            _id: new ObjectId(commentId),
        });
        // remove commentID from post-comment-array
        const removeFromPost = await PostModel.findOneAndUpdate({
            _id: postId
        }, {
            $pull: {
                "comments": new ObjectId(commentId)
            }
        });

        if (removeComment && removeFromPost) {
            const selectedPost = await getSelectedPost(postId)
            res.status(200).json({
                selectedPost: selectedPost
            });
        }

    } catch (err) {
        res.status(500).json("Something went wrong");
    }
}


export default {
    getPosts,
    createPost,
    deletePost,
    likePost,
    commentPost,
    getOnePost,
    deleteComment
};