import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import path from "path";

// const storage = multer.diskStorage({
//     destination: "./public/images",
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedFiles = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (allowedFiles.includes(file.mimetype)){
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
  
// const upload = multer({storage, fileFilter});

const createToken = (_id) => {
    return jwt.sign({
        _id
    }, process.env.JWT_SECRET, {
        expiresIn: '3d'
    })
}

async function getSignIn(req, res) {
    let query = null;
    try {
        query = new URLSearchParams({
            type: "success",
            message: "Successfully logged out!"
        });
        req.session.destroy();

    } catch (err) {
        console.log(err)
        query = new URLSearchParams({
            type: "error",
            message: "Something went wrong"
        });
    } finally {
        const qStr = query.toString();
        res.redirect(`/?${qStr}`);

    }
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
            res.status(400).json({token, message: "Something went wrong"});
        }

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
        const user = await UserModel.findById(id).select('-password');
        console.log("USER,", user)
        return user;
    } catch (err) {
        return {message: "something went wrong"};
    }
}


async function editProfile(req, res) {
    let image;
    let age;
    let city;
    let description;
    
    if(req.file){
        image = req.file.filename;
    }
  
    if (req.body.age) {
        age = req.body.age
    }
    
    if(req.body.city) {
        city = req.body.city;
    }
    
    if (req.body.description) {
        description = req.body.description;
    }
    
    try {
    
    await UserModel.updateOne({
        _id: req.user._id,
    }, {
        img: image,
        age,
        city,
        description

    })

    const userInformation = await getUserInfo(req.user._id);
        if (!userInformation) {
            res.status(400).json({token, message: "Something went wrong"});
        }

    res.status(200).json({
        user: userInformation
    });
  
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
}

const getAllUsers = async (req, res) => {
try {

    const allUsers = await UserModel.find({})
    res.status(200).json(allUsers);
  
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
}

const getOneUser = async (req, res) => {
    try {
    console.log(req.params.id)
    const id = req.params.id;
    const user =  await UserModel.findOne({
        _id: id
    });
    console.log(user)
    res.status(200).json(user);
  
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Server error');
    }
}

export default {
    getSignIn,
    signUpUser,
    getUserInfo,
    signIn,
    editProfile,
    getAllUsers,
    getOneUser
};