const express = require("express");
const {connectDB} = require("./config/database")
const User = require("./models/user")
const {validateSignUpData} = require("./helpers/validation")
const bycrpt = require("bcrypt")

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

app.get("/", (req, res) => {
  res.send("Welcome to dev tinder backend!")
})

app.post("/signup",async(req,res)=>{
  //Creatung
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
    const isPasswordValid = await bycrpt.compare(password,user.password);
    if(isPasswordValid){
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

app.get("/feed",async(req,res) => {
  const email = req.body.emailId;
  const data = await User.find({})
  if(data){
    res.send(data)
  }
  else{
    res.status(404).send("User not found")
  }
})

//Delete user from DB
app.delete("/user", async(req,res) => {
  const userId = req.body.userId;
  try{
  const result = await User.findByIdAndDelete(userId);
  console.log(result);
  res.send("User deleted succesfully")
  }
  catch(e){
    console.log(e,"Error")
  }
})

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const UPDATES_RESTRICTED_FOR = ["emailId"];
    const isUpdateAllowed = Object.keys(data).every( k => !UPDATES_RESTRICTED_FOR.includes(k));
    if(!isUpdateAllowed){
      res.status(400).send("Update not allowed.")
    }
    const user = await User.findByIdAndUpdate(userId, { ...data}, {returnDocument:"after"});
    res.send({message:"User updated succesfully!", data:user})
  } catch (e) {
    console.log(e, "Error!");
  }
});

