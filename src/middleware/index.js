const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try{
  const { token } =  req.cookies;
  if(!token){
    throw new Error("Invalid Token!");
  }
  const decodedObject = await jwt.verify(token,"DEVTENDER2401")
  const user = await User.findById(decodedObject?._id);
    
    if(user){
    // pass the user id to next middleware
      req.user = user;
      next();
    }
    else{
      throw new Error("User not found");
    }
  }catch(e){
     res.status(401).send(e.message)
  }
}

module.exports = {
    userAuth
}