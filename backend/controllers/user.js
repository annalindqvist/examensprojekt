import UserModel from "../models/user.js";
import MessageModel from "../models/message.js";
import LikeModel from "../models/like.js";
import CommentModel from "../models/comment.js";
import ChatModel from "../models/chat.js";
import PostModel from "../models/post.js";
import NotificationsModel from "../models/notifications.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

async function signUpUser(req, res) {

    const {
        email,
        firstname,
        lastname,
        age,
        city,
        password1,
        password2,
        terms
    } = req.body;

    try {

        if (!terms) {
            return res.status(400).json({
                message: "You need to read and agree to terms and conditions to sign up."
            });
        }

        if (password1 !== password2) {
            return res.status(400).json({
                message: "Password doesnt match."
            });
        };

        // create user document instance locally
        const user = new UserModel({
            email,
            firstname,
            lastname,
            age,
            city,
            password: password2
        })
        // save to database
        await user.save()
        // create a token
        const token = createToken(user._id);
        const userInformation = await getUserInfo(user._id);
        if (!userInformation) {
            res.status(400).json({
                message: "Something went wrong."
            });
        }

        res.status(200).json({
            token,
            user: userInformation
        });

    } catch (err) {
        res.status(400).json({
            message: "Something went wrong."
        })
    }

}

// signin user
async function signIn(req, res) {

    try {
        const {
            email,
            password
        } = req.body;

        //check if user exists in db
        const user = await UserModel.findOne({
            email
        });

        // if no user could be found
        if (!user) {
            return res.status(400).json({
                message: "Email or password is incorrect."
            });
        }

        // match password from form with hashed password in db
        const isMatching = await user.matchPassword(password, user.password);

        // // if password doesnt match
        if (!isMatching) {
            return res.status(400).json({
                message: "Email or password is incorrect."
            });
        };

        // create a token
        const token = createToken(user._id);
        const userInformation = await getUserInfo(user._id);
        if (!userInformation) {
            res.status(400).json({
                message: "Something went wrong"
            });
        }

        res.status(200).json({
            token,
            user: userInformation
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
}

// get the logged in users profile
async function getUserInfo(id) {
    try {
        //.select('-password') - get all info of the user but not password
        const user = await UserModel.findById(id).select('-password').populate({
                path: "savedGirls",
                select: "firstname city img age"
            })
            .exec();
        return user;
    } catch (err) {
        return {
            message: "something went wrong"
        };
    }
}

async function editProfilePicture(req, res) {

    try {
        const updatePicture = await UserModel.updateOne({
            _id: req.user._id,
        }, {
            img: req.file.filename,
        })
        if (updatePicture) {

            const userInformation = await getUserInfo(req.user._id);
            if (!userInformation) {
                res.status(400).json({
                    token,
                    message: "Something went wrong"
                });
            }

            res.status(200).json({
                user: userInformation
            });
        } else {
            res.status(400).json({
                message: "Something went wrong"
            });
        }

    } catch (err) {
        res.status(500).send('Server error');
    }
}

async function editProfile(req, res) {
    const {
        age,
        city,
        description,
        intrests
    } = req.body;

    try {

        const toLongIntrest = intrests.filter(i => i.length > 14)
        if (toLongIntrest.length > 0) {
            return res.status(400).json({
                message: "Sorry intrest can max be 14 characters."
            });
        }

        const updateProfileInfo = await UserModel.updateOne({
            _id: req.user._id,
        }, {
            age,
            city,
            description,
            intrests
        })

        if (updateProfileInfo) {

            const userInformation = await getUserInfo(req.user._id);
            if (!userInformation) {
                res.status(400).json({
                    message: "Something went wrong"
                });
            }

            res.status(200).json({
                user: userInformation
            });
        } else {
            res.status(400).json({
                message: "Something went wrong"
            });
        }

    } catch (err) {
        res.status(500).send({
            message: 'Server error'
        });
    }
}

async function editAuthSettings(req, res) {
    const {
        email,
        oldPassword,
        newPassword1,
        newPassword2
    } = req.body;

    try {

        if (newPassword1 !== newPassword2) {
            return res.status(400).json({
                message: "Password doesnt match"
            });
        }

        //check if user exists in db
        const user = await UserModel.findOne({
            _id: req.user._id
        });

        // if no user could be found
        if (!user) {
            return res.status(400).json({
                message: "Could not find any user."
            });
        }

        // match password from form with hashed password in db
        const isMatching = await user.matchPassword(oldPassword, user.password);

        // // if password doesnt match
        if (!isMatching) {
            return res.status(400).json({
                message: "Old password doesnt match."
            });
        };

        let salt = bcrypt.genSaltSync(10);
        const newHashedPassword = bcrypt.hashSync(newPassword2, salt);

        const updateAuthInfo = await UserModel.updateOne({
            _id: req.user._id,
        }, {
            email,
            password: newHashedPassword
        })

        const userInformation = await getUserInfo(req.user._id);
        if (!userInformation) {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }

        res.status(200).json({
            user: userInformation
        });

    } catch (err) {
        res.status(500).send('Server error');
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find().select("firstname img id intrests description city age");
        if (allUsers) {
            res.status(200).json(allUsers);
        } else {
            res.status(400).json({
                message: "Something went wrong"
            });
        }

    } catch (err) {
        res.status(500).send({
            message: 'Server error'
        });
    }
}

const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findOne({
            _id: id
        }).select("firstname img id intrests description city age");
        res.status(200).json(user);

    } catch (err) {
        res.status(500).send({
            message: 'Server error'
        });
    }
}

const saveOneUser = async (req, res) => {
    try {
       
        const {
            saveUserId
        } = req.body;
        const alreadySaved = await UserModel.findOne({
            _id: req.user._id,
            savedGirls: saveUserId
        })
        if (alreadySaved) {
            await UserModel.updateOne({
                _id: req.user._id,
            }, {
                $pull: {
                    savedGirls: saveUserId
                }
            })
        }
        if (!alreadySaved) {
            await UserModel.updateOne({
                _id: req.user._id,
            }, {
                $push: {
                    savedGirls: saveUserId
                }
            })

            // create new notification
            const notificationDoc = new NotificationsModel({
                notifictionType: "saved",
                senderId: req.user._id,
                recieverId: saveUserId
            });
            await notificationDoc.save();
        }


        const userInformation = await getUserInfo(req.user._id);
        if (!userInformation) {
            res.status(400).json({
                token,
                message: "Something went wrong"
            });
        }

        res.status(200).json({
            user: userInformation
        });

    } catch (err) {
        
        res.status(500).send({
            message: 'Server error'
        });
    }
}

const deleteAccount = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await UserModel.findOne({
            _id: id
        });
        if (!user) {
            
            return res.status(400).json({
                message: "Something went wrong"
            });
        }

        await PostModel.deleteMany({
            postedBy: req.user._id
        })
        await CommentModel.deleteMany({
            postedBy: req.user._id
        })
        await LikeModel.deleteMany({
            likedBy: req.user._id
        })
        await MessageModel.deleteMany({
            senderId: req.user._id
        })
        await ChatModel.deleteMany({
            members: {
                $in: [req.user._id]
            },
        })
        await NotificationsModel.deleteMany({
            senderId: req.user._id
        })
        const deleteUser = await UserModel.findByIdAndDelete(id)
        if (!deleteUser) {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }
        res.status(200).json('Account deleted');

    } catch (err) {
        res.status(500).send({
            message: 'Server error'
        });
    }
}

// get users notifications
async function getNotifications(req, res) {

    const userId = req.user._id;
    try {
        //.select('-password') - get all info of the user but not password
        const notifications = await NotificationsModel.find({recieverId: userId}).populate({
                path: "senderId",
                select: "firstname img"
            })
            .sort({
                createdAt: -1
            })
            .exec();

        if(notifications) {
            res.status(200).json({
                notifications
            });
        }
        else {
            res.status(400).json({
                message: "Sorry no notifications"
            });
        }

    } catch (err) {
        return res.status(400).json({
            message: "Something went wrong"
        });
    }
}


export default {
    signUpUser,
    getUserInfo,
    signIn,
    editProfile,
    editProfilePicture,
    editAuthSettings,
    getAllUsers,
    getOneUser,
    saveOneUser,
    deleteAccount,
    getNotifications
};