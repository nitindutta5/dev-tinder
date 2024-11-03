const express = require("express");

const app = express();

app.listen(3000);

app.use("/test",(req, res) => {
    res.send("<h1>SERVER IS LISTENING ON PORT 3000</h1>")
})