const express = require('express');
const router = express.Router();
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middleware");


router.get("/profile", userAuth, async(req, res) => {
  try{
const {token} = req.cookies;
if(!token){
  throw new Error("Invalid Token")
}
const isTokenValid = await jwt.verify(token,"DEVTENDER2401");
const {_id} = isTokenValid;
const userData = await User.findById(_id);
if(!userData){
   throw new Error("User doesnt exists!")
}
res.send(userData)
  } catch(e){
    console.log(e,"Error");
    res.status(500).send(e.message)
  }

})

module.exports = router;