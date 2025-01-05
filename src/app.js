const express = require("express");
const {connectDB} = require("./config/database")

const app = express();
const User = require("./models/user")


connectDB().then((val) => {
  console.log("DB Connected Succesfully")
  app.listen(3000, () => {
    console.log("LISTENING TO PORT 3000")
  });
}).catch((e) =>{
  console.log(e,"DB Error Occured")
})


app.use(express.json());

app.post("/signup",async(req,res)=>{
  //Creatung
  try{
    const user = new User(req.body);
    await user.save();
    res.send("User Created Succesfully")
  }
  catch(e){
    console.error(e,"Error");
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

app.patch("/user", async (req, res) => {
  const {userId, ...data} = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, { ...data}, {returnDocument:"after"});
    res.send({message:"User updated succesfully!", data:user})
  } catch (e) {
    console.log(e, "Error!");
  }
});

