const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
const { userAuth } = require("../middleware");
const { validateProfileEditData, isPasswordStrongEnough } = require("../helpers/validation");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const isTokenValid = await jwt.verify(token, "DEVTENDER2401");
    const { _id } = isTokenValid;
    const userData = await User.findById(_id);
    if (!userData) {
      throw new Error("User doesnt exists!");
    }
    res.send(userData);
  } catch (e) {
    console.log(e, "Error");
    res.status(500).send(e.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request!");
    }
    const user = await req.user;
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });
    let updateUser = await user.save();
    if (!updateUser) {
      throw new Error("Unable to update profile!");
    }
    res.send({ message: "Profile is updated", data: updateUser });
  } catch (e) {
    console.log(e, "Error");
    res.status(400).send(e.message);
  }
});

router.patch("/profile/change-password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("Invalid Request");
    }
    const user = await req.user;
    const isPasswordValid = await bycrpt.compare(oldPassword, user.password);
    const oldPasswordHash = await bycrpt.hash(oldPassword, 10);
    if (!isPasswordValid) {
      throw new Error("Invalid Old Password");
    }
    const isPasswordSame = await bycrpt.compare(newPassword, user.password);
    if(isPasswordSame) {
      throw new Error("New Password cannot be same as old password");
    }
    const isPasswordStrong = isPasswordStrongEnough(newPassword);
    if(!isPasswordStrong) {
      throw new Error("Password is not strong enough");
    }
    const newPasswordHash = await bycrpt.hash(newPassword, 10);
    user.password = newPasswordHash;
    await user.save();
    res.send("Password Updated Successfully");
  } catch (e) {
    console.log(e, "Error");
    res.status(400).send(e.message);
  }
});   

module.exports = router;
