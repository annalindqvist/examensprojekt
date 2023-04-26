import jwt from 'jsonwebtoken';
import UserModel from "../models/user.js";

const verifyJWT = async (req, res, next) => {
    // verify user is authenticated
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }


  const token = authorization.split(' ')[1];
  
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await UserModel.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: 'Request is not authorized'});
  }
};

export default verifyJWT;