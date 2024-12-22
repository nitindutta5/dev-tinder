const express = require("express");
const { adminAuth } = require("./middleware");

const app = express();

app.listen(3000);

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
    res.send({
      name:"Nitin",
      type:"Admin"
    })
});
