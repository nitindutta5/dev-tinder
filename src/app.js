const express = require("express");
const {connectDB} = require("./config/database")

const app = express();
const User = require("./models/user")

app.post("/signup",async(req,res)=>{
  //Creatung
  const user = new User({
    firstName:"Nitin",
    lastName:"Dutta",
    emailId:"nitindutta5@gmail.com",
    password:"Test@123"
  });
  await user.save();
  res.send("User Created Succesfully")
})


connectDB().then((val) => {
  console.log("DB Connected Succesfully")
  app.listen(3000, () => {
    console.log("LISTING TO PORT 3000")
  });
}).catch((e) =>{
  console.log(e,"DB Error Occured")
})
