const express = require("express");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require("./helpers/validation")
const bycrpt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware");

const app = express();

connectDB().then((val) => {
  console.log("DB Connected Succesfully")
  app.listen(3000, () => {
    console.log("LISTENING TO PORT 3000")
  });
}).catch((e) =>{
  console.log(e,"DB Error Occured")
})


app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Welcome to dev tinder backend!")
})

app.post("/signup",async(req,res)=>{
  //Creating
  try{
    validateSignUpData(req);
    const {password} = req.body;
    const passwordHash = await bycrpt.hash(password, 10)
    let data = {...req.body, password:passwordHash}
    const user = new User(data);
    await user.save();
    res.send("User Created Succesfully")
  }
  catch(e){
    console.error(e.message,"Error");
    res.status(500).send(e.message);
  }
})

app.post("/login",async(req,res)=>{
  //Creatung
  try{
    const {emailId, password} = req.body;
    const user = await User.findOne({
      emailId:emailId
    });
    if(!user){
      throw new Error("Invalid Credentails")
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){
      let token = await user.getJWT();
      res.cookie("token",token,{httpOnly:true, secure:true})
      res.send("User logged in succesfully")
    }
  else{
    throw new Error("Invalid Credentails!")
  }

  }
  catch(e){
    console.error(e.message,"Error",e);
    res.status(500).send(e.message);
  }
})


app.get("/profile", userAuth, async(req, res) => {
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

