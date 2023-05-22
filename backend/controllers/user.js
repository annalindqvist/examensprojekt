import UserModel from "../models/user.js";
import PostModel from "../models/post.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

async function signUpUser(req, res) {

    const {
        email,
        firstname,
        lastname,
        password1,
        password2
    } = req.body;

    console.log(email, firstname, lastname, password1, password2)

    try {

        if (password1 !== password2) {
            return res.status(400).json({
                error: "Password doesnt match"
            });
        };

        // create user document instance locally
        const user = new UserModel({
            email,
            firstname,
            lastname,
            password: password2
        })
        // save to database
        await user.save()
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
        console.log(err)
        res.status(400).json({
            error: err.message
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

        console.log("Login form: email,", email, "password,", password);

        //check if user exists in db
        const user = await UserModel.findOne({
            email
        });
        console.log("Login found user,", user)

        // if no user could be found
        if (!user) {
            return res.status(400).json({
                message: "Email or password is incorrect."
            });
        }

        // match password from form with hashed password in db
        const isMatching = await user.matchPassword(password, user.password);

        console.log("Login isMatching", isMatching)
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

        console.log("userInformation", userInformation)

        res.status(200).json({
            token,
            user: userInformation
        });

    } catch (err) {
        console.log(err)
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
        console.log("USER,", user)
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
        console.log(err)
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

    console.log(intrests, "REQ BODY", req.body)
    try {

        const updateProfileInfo = await UserModel.updateOne({
            _id: req.user._id,
        }, {
            age,
            city,
            description,
            intrests
        })
        console.log(updateProfileInfo);

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
        console.log(err)
        res.status(500).send('Server error');
    }
}

async function editAuthSettings(req, res) {
    const {
        email,
        oldPassword,
        newPassword1,
        newPassword2
    } = req.body;

    console.log(email, "REQ BODY", req.body)
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
        console.log("user", user)

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
            console.log("Not matching password")
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
        // await user.save()

        console.log(updateAuthInfo);

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
        console.log(err)
        res.status(500).send('Server error');
    }
}

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find({})
        console.log(allUsers)
        // only select: firstname, savedgirls if saved the online user, img, id, interests, description, 
        res.status(200).json(allUsers);

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
}

const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findOne({
            _id: id
        });
        res.status(200).json(user);

    } catch (err) {
        res.status(500).send('Server error');
    }
}

const saveOneUser = async (req, res) => {
    try {
        console.log(req.body)
        const {
            saveUserId
        } = req.body;
        const alreadySaved = await UserModel.findOne({
            _id: req.user._id,
            savedGirls: saveUserId
        })
        console.log("alreadySaved" ,alreadySaved)
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
        }


        const userInformation = await getUserInfo(req.user._id);
        if (!userInformation) {
            res.status(400).json({
                token,
                message: "Something went wrong"
            });
        }

        console.log("---userinformation, ", userInformation);
        res.status(200).json({
            user: userInformation
        });

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
}

const deleteAccount = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await UserModel.findOne({
            _id: id
        });
        if (!user) {
            console.log("!user")
            return res.status(400).json({
                message: "Something went wrong"
            });
        }

        await PostModel.deleteMany({
            postedBy: req.user._id
        })
        const deleteUser = await UserModel.findByIdAndDelete(id)
        if (!deleteUser) {
            console.log("!deleteuser")
            return res.status(400).json({
                message: "Something went wrong"
            });
        }
        res.status(200).json('Account deleted');

    } catch (err) {
        console.log(err)
        res.status(500).send('Server error');
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
    deleteAccount
};