const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt")

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength:4 },
  lastName: {
    type: String
  },
  emailId: {
    type: String,
    required: true,
    unique:true,
    lowerCase:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Email Address is invalid",value);
      }
    }
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
         throw new Error("Gender is invalid");
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Photo url is invalid");
      }
    }
  },
  about:{
    type:String,
    default:"This is the default about us content."
  },
  skills:{
    type:[String]
  }
});

userSchema.methods.getJWT = async function () {
  const user = this;
  let token = await jwt.sign(
    {
      _id: user._id,
    },
    "DEVTENDER2401",
    {
      expiresIn: "1d",
    }
  );
  return token;
};

userSchema.methods.validatePassword = async function(password){
  const user = this;
  const isPasswordValid = await bycrpt.compare(password,user.password);
  return isPasswordValid;
}
const User = mongoose.model("User", userSchema);

module.exports = User;
