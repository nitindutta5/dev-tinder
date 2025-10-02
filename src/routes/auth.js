const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { validateSignUpData } = require("../helpers/validation");
const bycrpt = require("bcrypt");

router.post("/signup", async (req, res) => {
  //Creating
  try {
    validateSignUpData(req);
    const { password } = req.body;
    const passwordHash = await bycrpt.hash(password, 10);
    let data = { ...req.body, password: passwordHash };
    const user = new User(data);
    await user.save();
    res.send("User Created Succesfully");
  } catch (e) {
    console.error(e.message, "Error");
    res.status(500).send(e.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({
      emailId: emailId,
    });
    if (!user) {
      throw new Error("Invalid Credentails");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      let token = await user.getJWT();
      res.cookie("token", token, { httpOnly: true, secure: true });
      res.send("User logged in succesfully");
    } else {
      throw new Error("Invalid Credentails!");
    }
  } catch (e) {
    console.error(e.message, "Error", e);
    res.status(500).send(e.message);
  }
});

router.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    ?.send("User logged out");
});

module.exports = router;
