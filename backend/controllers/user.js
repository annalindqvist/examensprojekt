import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

async function signUpUser(req, res) {

    const {
        email,
        firstname,
        lastname,
        password
    } = req.body;

    try {
        // create user document instance locally
        const user = new UserModel({
            email,
            firstname,
            lastname,
            password
        })
        // save to database
        await user.save()
        // create a token - 
        //const token = createToken(user._id)

        res.status(200).json({
            message: "Successfully signed up!"
        });

    } catch (err) {
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
                select: "firstname city img"
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
    const {age, city, description, intrests} = req.body;

    console.log(intrests,"REQ BODY", req.body)
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

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find({})
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

export default {
    signUpUser,
    getUserInfo,
    signIn,
    editProfile,
    editProfilePicture,
    getAllUsers,
    getOneUser,
    saveOneUser,
};